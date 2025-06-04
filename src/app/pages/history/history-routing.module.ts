import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryPage } from './history.page';
import { HistoryComponent } from './components/history/history.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryPage,
    children: [
      {
        path: '',
        component: HistoryComponent
      },
      {
        path: 'game/:id',
        component: GameDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryPageRoutingModule {}
