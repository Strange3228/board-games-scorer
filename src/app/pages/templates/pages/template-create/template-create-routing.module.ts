import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateCreatePage } from "./template-create.page";

const routes: Routes = [
  {
    path: '',
    component: TemplateCreatePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateCreateRoutingModule {}
