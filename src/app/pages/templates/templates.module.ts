import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TemplatesPageRoutingModule } from './templates-routing.module';
import { TemplatesPage } from './templates.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TemplatesPageRoutingModule
  ],
  declarations: [TemplatesPage]
})
export class TemplatesPageModule {} 