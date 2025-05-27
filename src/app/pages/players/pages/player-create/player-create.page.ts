import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavController } from "@ionic/angular";
import { v4 as uuidv4 } from 'uuid';
import { PLAYER_COLORS } from "./const/player-colors.cont";
import { Player, PlayersStoreService } from "../../../../shared/store/players.store";

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.page.html',
  styleUrls: ['./player-create.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerCreatePage {
  public playerColors: {[key: string]: string} = PLAYER_COLORS;

  public playerName: string = '';
  public selectedColor: string;

  constructor(
    private navController: NavController,
    private playersStore: PlayersStoreService,
  ) { }

  public get isValid(): boolean {
    return this.playerName.trim().length > 0 && !!this.selectedColor;
  }

  public onSelectColor(color: string): void {
    this.selectedColor = color;
  }

  public onCancel(): void {
    this.navController.back();
  }

  public onSave(): void {
    if (!this.isValid) return;

    const newPlayer: Player = {
      id: uuidv4(),
      name: this.playerName.trim(),
      color: this.selectedColor,
      playedGames: [],
    };

    this.playersStore.addPlayer(newPlayer)
      .then(() => {
        this.navController.back();
      })
  }
}
