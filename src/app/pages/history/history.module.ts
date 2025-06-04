import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { HistoryComponent } from './components/history/history.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
  ],
  declarations: [
    HistoryPage,
    HistoryComponent,
    GameDetailsComponent
  ]
})
export class HistoryPageModule {}
