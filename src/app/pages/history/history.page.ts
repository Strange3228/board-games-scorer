import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GamesStoreService, Game } from '../../shared/store/games.store';
import { TemplatesStoreService, Template } from '../../shared/store/templates.store';
import { IonRouterOutlet, ViewWillEnter } from '@ionic/angular';
import { format } from 'date-fns';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: false,
})
export class HistoryPage implements ViewWillEnter {
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

  async ionViewWillEnter(): Promise<void> {
    await this.loadData();
  }

  public applyFilters(): void {
    let filtered = [...this.games];

    if (this.selectedTemplate) {
      filtered = filtered.filter(game => game.templateId === this.selectedTemplate);
    }

    if (this.selectedDate) {
      const selectedDate = format(new Date(this.selectedDate), 'yyyy-MM-dd');
      filtered = filtered.filter(game => {
        const gameDate = format(new Date(game.date), 'yyyy-MM-dd');
        return gameDate === selectedDate;
      });
    }

    this.filteredGames = filtered;
  }

  public hasWinner(game: Game): boolean {
    return !!game.winner;
  }

  public getWinnerName(game: Game): string {
    if (!game.winner) return 'No winner';
    const winner = game.players.find(p => p.player.id === game.winner?.playerId);
    return winner ? winner.player.name : 'Unknown';
  }

  public viewGameDetails(gameId: string): void {
    this.router.navigate(['game', gameId], { relativeTo: this.routerOutlet.activatedRoute });
  }

  public clearFilters(): void {
    this.selectedTemplate = '';
    this.selectedDate = '';
    this.applyFilters();
  }

  private async loadData(): Promise<void> {
    this.games = await this.gamesStore.getGames();
    this.templates = await this.templatesStore.getTemplates();
    this.applyFilters();
  }
}
