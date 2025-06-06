import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesStoreService } from '../../shared/store/games.store';
import { Template } from '../../shared/store/templates.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  mostPlayedTemplates: { template: Template; playCount: number }[] = [];

  constructor(
    public router: Router,
    private gamesStore: GamesStoreService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadMostPlayedTemplates();
  }

  private async loadMostPlayedTemplates(): Promise<void> {
    this.mostPlayedTemplates = await this.gamesStore.getMostPlayedTemplates(3);
  }

  async onNewGame(): Promise<void> {
    await this.router.navigate(['/game']);
  }
}
