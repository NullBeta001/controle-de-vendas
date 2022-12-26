import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Sales2Component } from './sales2.component';

const routes: Routes = [
  {
    path: "",
    component: Sales2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Sales2RoutingModule { }
