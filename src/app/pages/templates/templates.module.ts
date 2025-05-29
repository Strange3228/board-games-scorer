import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TemplatesPageRoutingModule } from './templates-routing.module';
import { TemplatesPage } from './templates.page';
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplatesPageRoutingModule,
    EmptyStateComponent,
  ],
  declarations: [TemplatesPage]
})
export class TemplatesPageModule {} 