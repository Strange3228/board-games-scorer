import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from "@angular/router";
import { Player, PlayersStoreService } from "../../shared/store/players.store";
import { AlertController, ModalController } from '@ionic/angular';
import { EditPlayerModalComponent } from './components/edit-player-modal/edit-player-modal.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersPage {
  players: Promise<Player[]> = Promise.resolve([]);
  filteredPlayers: Player[] | null = null;
  searchTerm: string = '';

  constructor(
    public router: Router,
    private playersStore: PlayersStoreService,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,
    private modalController: ModalController,
  ) {}

  public ionViewWillEnter(): void {
    this.players = this.playersStore.getPlayers().then(players => players || []);
    this.cdr.detectChanges();
  }

  public getWinCount(player: Player): number {
    return player.playedGames.filter(game => game.isWin).length;
  }

  public getWinRate(player: Player): string {
    if (player.playedGames.length === 0) return '0';
    const winCount = this.getWinCount(player);
    const winRate = (winCount / player.playedGames.length) * 100;
    return winRate.toFixed(0);
  }

  public async filterPlayers(): Promise<void> {
    if (!this.searchTerm.trim()) {
      this.filteredPlayers = null;
      this.cdr.detectChanges();
      return;
    }

    const allPlayers = await this.players;
    this.filteredPlayers = allPlayers.filter(player =>
      player.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.cdr.detectChanges();
  }

  public async editPlayer(player: Player): Promise<void> {
    const modal = await this.modalController.create({
      component: EditPlayerModalComponent,
      componentProps: {
        player: { ...player },
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      await this.playersStore.updatePlayer(data);
      this.players = this.playersStore.getPlayers().then(players => players || []);
      if (this.searchTerm) {
        await this.filterPlayers();
      }
      this.cdr.detectChanges();
    }
  }

  public async deletePlayer(player: Player): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete Player',
      message: `Are you sure you want to delete ${player.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            await this.playersStore.deletePlayer(player.id);
            this.players = this.playersStore.getPlayers().then(players => players || []);
            this.cdr.detectChanges();
          },
        },
      ],
    });

    await alert.present();
  }
}
