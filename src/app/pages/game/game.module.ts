import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GamePageRoutingModule } from './game-routing.module';
import { GamePage } from './game.page';
import { PlayerInitialsPipe } from '../../shared/pipes/player-initials.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule,
    PlayerInitialsPipe,
  ],
  declarations: [GamePage]
})
export class GamePageModule {}
