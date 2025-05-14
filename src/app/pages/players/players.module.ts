import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayersPageRoutingModule } from './players-routing.module';

import { PlayersPage } from './players.page';
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayersPageRoutingModule,
    EmptyStateComponent,
  ],
  declarations: [PlayersPage]
})
export class PlayersPageModule {}
