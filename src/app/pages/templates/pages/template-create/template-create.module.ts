import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TemplateCreatePage } from './template-create.page';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { TemplateCreateRoutingModule } from "./template-create-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrimaryButtonComponent,
    TemplateCreateRoutingModule,
  ],
  declarations: [TemplateCreatePage],
  bootstrap: [TemplateCreatePage],
})
export class TemplateCreatePageModule {}
