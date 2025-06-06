import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game, GamesStoreService } from "../../shared/store/games.store";
import { Player, PlayersStoreService } from "../../shared/store/players.store";

interface ILastPlayedGame extends Game {
  winnerPlayer?: Player;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage {
  mostPlayedTemplates: { template: any; playCount: number }[] = [];
  lastPlayedGames: ILastPlayedGame[] = [];
  mostActivePlayers: { player: any; gamesPlayed: number; wins: number }[] = [];

  constructor(
    public router: Router,
    private gamesStore: GamesStoreService,
    private playersStore: PlayersStoreService,
  ) {}

  ionViewWillEnter() {
    this.loadDashboardData();
  }

  private async loadDashboardData() {
    await Promise.all([
      this.loadMostPlayedTemplates(),
      this.loadLastPlayedGames(),
      this.loadMostActivePlayers()
    ]);
  }

  private async loadMostPlayedTemplates() {
    this.mostPlayedTemplates = await this.gamesStore.getMostPlayedTemplates(3);
  }

  private async loadLastPlayedGames() {
    const games = await this.gamesStore.getLastPlayedGames(3);
    const players = await this.playersStore.getPlayers();

    this.lastPlayedGames = games.map(game => ({
      ...game,
      winnerPlayer: game.winner ? players.find(p => p.id === game.winner?.playerId) : undefined,
    }));
  }

  private async loadMostActivePlayers() {
    const players = await this.playersStore.getPlayers();

    const playerStats = players.map(player => ({
      player,
      gamesPlayed: player.playedGames?.length || 0,
      wins: player.playedGames?.filter(game => game.isWin).length || 0
    }));

    this.mostActivePlayers = playerStats
      .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
      .slice(0, 3);
  }

  onNewGame() {
    this.router.navigate(['/templates']);
  }
}
