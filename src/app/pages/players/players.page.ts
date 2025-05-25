import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from "@angular/router";
import { Player, PlayersStoreService } from "../../shared/store/players.store";

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersPage {
  players: Promise<Player[]>;

  constructor(
    public router: Router,
    private playersStore: PlayersStoreService,
    private cdr: ChangeDetectorRef,
  ) {}

  public ionViewWillEnter(): void {
    this.players = this.playersStore.getPlayers();
    this.cdr.detectChanges();
  }
}
