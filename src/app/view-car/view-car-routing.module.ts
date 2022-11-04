import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCarPage } from './view-car.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCarPageRoutingModule {}
