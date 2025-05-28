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
    private toastController: ToastController,
  ) {}

  async onNewGame(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Game creation will be implemented soon!',
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }
}
