import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Template, TemplatesStoreService } from '../../shared/store/templates.store';
import { Player, PlayersStoreService } from '../../shared/store/players.store';
import { Game, GameInProgress, GamesStoreService, PlayerScore } from '../../shared/store/games.store';
import { SelectPlayersModalComponent } from './components/select-players-modal/select-players-modal.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class GamePage implements OnInit {
  templates: Promise<Template[]>;
  selectedTemplate?: Template;
  gameDate: string;
  selectedPlayers: Player[] = [];
  playerScores: { [playerId: string]: PlayerScore } = {};
  notes: string = '';

  constructor(
    private router: Router,
    private templatesStore: TemplatesStoreService,
    private playersStore: PlayersStoreService,
    private gamesStore: GamesStoreService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private cdr: ChangeDetectorRef,
  ) {
    const now = new Date();
    this.gameDate = now.toISOString();
    this.templates = this.templatesStore.getTemplates();
  }

  compareWithFn(t1: any, t2: any): boolean {
    return t1?.id === t2?.id;
  }

  async ngOnInit() {
    const gameInProgress = await this.gamesStore.getGameInProgress();
    if (gameInProgress) {
      await this.restoreGameInProgress(gameInProgress);
    }
  }

  private async restoreGameInProgress(game: GameInProgress) {
    this.selectedTemplate = await this.templatesStore.getTemplateById(game.templateId);
    this.gameDate = game.date.toISOString();
    this.notes = game.notes || '';

    const players = await this.playersStore.getPlayers();
    this.selectedPlayers = game.playerScores
      .map(ps => players.find(p => p.id === ps.playerId))
      .filter((p): p is Player => !!p);

    game.playerScores.forEach(ps => {
      this.playerScores[ps.playerId] = {
        playerId: ps.playerId,
        points: ps.points,
        isWinner: ps.isWinner,
      };
    });

    this.cdr.detectChanges();
  }

  async onSelectPlayers() {
    const modal = await this.modalCtrl.create({
      component: SelectPlayersModalComponent,
      componentProps: {
        selectedPlayerIds: this.selectedPlayers.map(p => p.id),
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.selectedPlayers = data.selectedPlayers;

      this.selectedPlayers.forEach(player => {
        if (!this.playerScores[player.id]) {
          this.initializePlayerScore(player.id);
        }
      });

      Object.keys(this.playerScores).forEach(playerId => {
        if (!this.selectedPlayers.some(p => p.id === playerId)) {
          delete this.playerScores[playerId];
        }
      });

      this.cdr.detectChanges();
    }
  }

  async onTemplateChange() {
    if (!this.selectedTemplate) return;

    this.playerScores = {};
    this.selectedPlayers.forEach(player => {
      this.initializePlayerScore(player.id);
    });

    this.cdr.detectChanges();
  }

  private initializePlayerScore(playerId: string) {
    if (!this.selectedTemplate) return;

    let points: { [pointTypeId: string]: number } | undefined;

    if (this.selectedTemplate.winType === 'points') {
      points = {};
      this.selectedTemplate.pointTypes.forEach(pt => {
        points![pt.id] = 0;
      });
    }

    this.playerScores[playerId] = {
      playerId,
      points,
      isWinner: this.selectedTemplate.winType === 'win_lose' ? false : undefined,
    };
  }

  async onCreateTemplate() {
    await this.router.navigate(['/templates/create']);
  }

  updatePoints(playerId: string, pointTypeId: string, value: number | null | string) {
    if (!this.playerScores[playerId]?.points) {
      this.initializePlayerScore(playerId);
    }

    const numericValue = value === null || value === '' ? 0 : Number(value);

    if (isNaN(numericValue)) {
      this.playerScores[playerId].points![pointTypeId] = 0;
    } else {
      this.playerScores[playerId].points![pointTypeId] = numericValue;
    }

    this.saveGameProgress();
    this.cdr.detectChanges();
  }

  updateWinner(playerId: string, isWinner: boolean) {
    if (this.selectedTemplate?.winType === 'win_lose') {
      this.playerScores[playerId].isWinner = isWinner;
      this.saveGameProgress();
    }
  }

  private async saveGameProgress() {
    if (!this.selectedTemplate) return;

    const gameInProgress: GameInProgress = {
      templateId: this.selectedTemplate.id,
      date: new Date(this.gameDate),
      playerScores: Object.values(this.playerScores),
      notes: this.notes,
    };

    await this.gamesStore.saveGameInProgress(gameInProgress);
  }

  get isValid(): boolean {
    if (!this.selectedTemplate) return false;
    if (!this.selectedPlayers.length) return false;

    const allPlayersHaveScores = this.selectedPlayers.every(player => {
      const score = this.playerScores[player.id];
      if (!score) return false;

      if (this.selectedTemplate?.winType === 'points') {
        if (!score.points) return false;

        return this.selectedTemplate.pointTypes.every(pt => {
          const value = score.points![pt.id];
          return typeof value === 'number' && !isNaN(value);
        });
      } else {
        return typeof score.isWinner === 'boolean';
      }
    });

    if (!allPlayersHaveScores) return false;

    if (this.selectedTemplate.winType === 'win_lose') {
      const hasWinner = Object.values(this.playerScores).some(score => score.isWinner);
      if (!hasWinner) return false;
    }

    return true;
  }

  async onFinishGame() {
    if (!this.isValid || !this.selectedTemplate) return;

    const alert = await this.alertCtrl.create({
      header: 'Finish Game',
      message: 'Are you sure you want to finish this game? This will calculate the winner and complete the game session.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Finish Game',
          role: 'confirm',
          handler: () => this.saveGame(),
        },
      ],
    });

    await alert.present();
  }

  private async saveGame() {
    if (!this.selectedTemplate) return;

    try {
      const now = new Date();
      const game: Game = {
        id: crypto.randomUUID(),
        templateId: this.selectedTemplate.id,
        template: this.selectedTemplate,
        date: new Date(this.gameDate),
        players: this.selectedPlayers.map(player => ({
          player,
          score: this.playerScores[player.id],
        })),
        notes: this.notes,
        createdAt: now,
        updatedAt: now,
      };

      await this.gamesStore.addGame(game);

      for (const player of this.selectedPlayers) {
        const score = this.playerScores[player.id];
        let isWin = false;

        if (this.selectedTemplate.winType === 'points') {
          const playerTotal = Object.values(score.points || {}).reduce((sum, val) => sum + val, 0);
          const highestTotal = Math.max(
            ...Object.values(this.playerScores).map(s =>
              Object.values(s.points || {}).reduce((sum, val) => sum + val, 0)
            )
          );
          isWin = playerTotal === highestTotal;
        } else {
          isWin = score.isWinner === true;
        }

        await this.playersStore.addGameToPlayer(player.id, {
          templateId: this.selectedTemplate.id,
          isWin,
          date: new Date(this.gameDate),
        });
      }

      await this.gamesStore.clearGameInProgress();
      await this.showToast('Game saved successfully', 'success');
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error saving game:', error);
      await this.showToast('Failed to save game', 'danger');
    }
  }

  private async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }
}
