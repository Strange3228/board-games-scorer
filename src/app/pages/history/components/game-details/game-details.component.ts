import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesStoreService, Game } from '../../../../shared/store/games.store';
import { format } from 'date-fns';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  standalone: false,
})
export class GameDetailsComponent implements OnInit {
  game?: Game;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private gamesStore: GamesStoreService,
    private navCtrl: NavController,
    private router: Router
  ) {}

  async ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.game = await this.gamesStore.getGameById(gameId);
    }
    this.loading = false;
  }

  formatDate(date: Date): string {
    return format(new Date(date), 'MMMM dd, yyyy HH:mm');
  }

  hasWinner(): boolean {
    return !!this.game?.winner;
  }

  getWinnerName(): string {
    if (!this.game?.winner) return 'No winner';

    const game = this.game;
    if (!game) return 'Unknown';

    const winner = game.players.find(p => p.player.id === game.winner?.playerId);
    return winner ? winner.player.name : 'Unknown';
  }

  getTotalPoints(playerId: string): number {
    if (!this.game) return 0;
    const playerScore = this.game.players.find(p => p.player.id === playerId)?.score?.points;
    if (!playerScore) return 0;
    return Object.values(playerScore).reduce((sum, points) => sum + points, 0);
  }

  goBack(event?: any): void {
    if (event) {
      event.preventDefault();
    }
    this.router.navigate(['/tabs/history']);
  }
}
