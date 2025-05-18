import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayersPage } from './players.page';

const routes: Routes = [
  {
    path: '',
    component: PlayersPage
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/player-create/player-create.module').then( m => m.PlayerCreatePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayersPageRoutingModule {}
