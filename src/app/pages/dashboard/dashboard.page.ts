import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage {
  constructor(
    public router: Router,
  ) {}

  async onNewGame(): Promise<void> {
    await this.router.navigate(['/game']);
  }
}
