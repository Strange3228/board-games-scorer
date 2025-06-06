import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { FormatTimeAgoPipe } from "../../shared/pipes/format-time-ago.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormatTimeAgoPipe,
    DashboardPageRoutingModule,
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
