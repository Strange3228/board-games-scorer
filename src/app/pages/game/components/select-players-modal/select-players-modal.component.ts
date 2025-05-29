import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Player, PlayersStoreService } from '../../../../shared/store/players.store';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerInitialsPipe } from "../../../../shared/pipes/player-initials.pipe";

@Component({
  selector: 'app-select-players-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Select Players</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="cancel()">Cancel</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ng-container *ngIf="players | async as playersList">
        <div class="players-list">
          <ion-item *ngFor="let player of playersList">
            <ion-checkbox
              [checked]="isSelected(player)"
              (ionChange)="togglePlayer(player)"
              labelPlacement="end"
            >
              <div class="player-info">
                <div class="player-avatar" [ngStyle]="{'background-color': player.color}">
                  {{ player.name | playerInitials }}
                </div>
                <div class="player-name">{{ player.name }}</div>
              </div>
            </ion-checkbox>
          </ion-item>
        </div>

        <div class="no-players" *ngIf="!playersList.length">
          <p>No players available</p>
          <ion-button (click)="onCreatePlayer()">Create Player</ion-button>
        </div>

        <div class="actions">
          <ion-button
            expand="block"
            (click)="onCreatePlayer()"
          >
            <ion-icon name="person-add-outline" slot="start"></ion-icon>
            New Player
          </ion-button>

          <ion-button
            expand="block"
            (click)="confirm()"
            [disabled]="!selectedPlayers.length"
            color="primary"
          >
            Select Players ({{ selectedPlayers.length }})
          </ion-button>
        </div>
      </ng-container>
    </ion-content>
  `,
  styles: [`
    .players-list {
      margin-bottom: 1rem;
    }

    .player-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.5rem 0;
    }

    .player-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 500;
    }

    .player-name {
      font-size: 1rem;
      color: var(--ion-color-dark);
    }

    .no-players {
      text-align: center;
      padding: 2rem;
      color: var(--ion-color-medium);
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 2rem;
      padding-bottom: 1rem;
    }
  `],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PlayerInitialsPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPlayersModalComponent implements OnInit {
  @Input() selectedPlayerIds: string[] = [];

  players: Promise<Player[]>;
  selectedPlayers: Player[] = [];

  constructor(
    private modalCtrl: ModalController,
    private playersStore: PlayersStoreService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.players = this.playersStore.getPlayers();
  }

  async ngOnInit() {
    const players = await this.players;
    this.selectedPlayers = players.filter(p => this.selectedPlayerIds.includes(p.id));
    this.cdr.detectChanges();
  }

  isSelected(player: Player): boolean {
    return this.selectedPlayers.some(p => p.id === player.id);
  }

  togglePlayer(player: Player): void {
    const index = this.selectedPlayers.findIndex(p => p.id === player.id);
    if (index === -1) {
      this.selectedPlayers.push(player);
    } else {
      this.selectedPlayers.splice(index, 1);
    }
    this.cdr.detectChanges();
  }

  async onCreatePlayer() {
    await this.modalCtrl.dismiss();
    await this.router.navigate(['/players/create']);
  }

  cancel() {
    return this.modalCtrl.dismiss();
  }

  confirm() {
    return this.modalCtrl.dismiss({
      selectedPlayers: this.selectedPlayers,
    });
  }
}
