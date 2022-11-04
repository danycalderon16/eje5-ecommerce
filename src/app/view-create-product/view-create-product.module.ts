import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCreateProductPageRoutingModule } from './view-create-product-routing.module';

import { ViewCreateProductPage } from './view-create-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCreateProductPageRoutingModule
  ],
  declarations: [ViewCreateProductPage]
})
export class ViewCreateProductPageModule {}
