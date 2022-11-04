import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCreateProductPage } from './view-create-product.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCreateProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCreateProductPageRoutingModule {}
