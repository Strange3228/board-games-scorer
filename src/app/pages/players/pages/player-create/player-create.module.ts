import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerCreatePageRoutingModule } from './player-create-routing.module';

import { PlayerCreatePage } from './player-create.page';
import { PrimaryButtonComponent } from "../../../../shared/components/primary-button/primary-button.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlayerCreatePageRoutingModule,
        PrimaryButtonComponent
    ],
  declarations: [PlayerCreatePage]
})
export class PlayerCreatePageModule {}
