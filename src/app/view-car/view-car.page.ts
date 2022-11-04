import { Component, OnInit } from '@angular/core';
import { Product } from '../models/producto';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-view-car',
  templateUrl: './view-car.page.html',
  styleUrls: ['./view-car.page.scss'],
})
export class ViewCarPage implements OnInit {

  public productsInCar:Product[];

  constructor(private productService: ProductService) {
    this.productsInCar= productService.getProducts();
   }

  ngOnInit() {
  }

}
