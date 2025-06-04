import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GamesStoreService, Game } from '../../../../shared/store/games.store';
import { TemplatesStoreService, Template } from '../../../../shared/store/templates.store';
import { IonRouterOutlet } from '@ionic/angular';
import { format } from 'date-fns';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  standalone: false,
})
export class HistoryComponent {
  games: Game[] = [];
  filteredGames: Game[] = [];
  templates: Template[] = [];
  selectedTemplate: string = '';
  selectedDate: string = '';

  constructor(
    private gamesStore: GamesStoreService,
    private templatesStore: TemplatesStoreService,
    private router: Router,
    private routerOutlet: IonRouterOutlet
  ) {}

  ionViewWillEnter() {
    this.loadData();
  }

  private async loadData() {
    this.games = await this.gamesStore.getGames();
    this.templates = await this.templatesStore.getTemplates();
    this.applyFilters();
  }

  applyFilters() {
    this.filteredGames = this.games.filter(game => {
      const templateMatch = !this.selectedTemplate || game.templateId === this.selectedTemplate;
      const dateMatch = !this.selectedDate ||
        format(new Date(game.date), 'yyyy-MM-dd') === this.selectedDate;
      return templateMatch && dateMatch;
    });

    // Sort games by date, newest first
    this.filteredGames.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  hasWinner(game: Game): boolean {
    return !!game.winner;
  }

  getWinnerName(game: Game): string {
    if (!game?.winner) return 'No winner';
    const winner = game.players.find(p => p.player.id === game.winner?.playerId);
    return winner ? winner.player.name : 'Unknown';
  }

  formatDate(date: Date): string {
    return format(new Date(date), 'MMM dd, yyyy');
  }

  viewGameDetails(gameId: string) {
    this.router.navigate(['game', gameId], { relativeTo: this.routerOutlet.activatedRoute });
  }

  clearFilters() {
    this.selectedTemplate = '';
    this.selectedDate = '';
    this.applyFilters();
  }
}
