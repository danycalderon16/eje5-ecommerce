import { Component, OnInit } from '@angular/core';
import { Product } from '../models/producto';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.page.html',
  styleUrls: ['./view-cart.page.scss'],
})

export class ViewCartPage implements OnInit {
  public productsInCar:Product[];

  constructor(private productService: ProductService) {
    this.productsInCar= productService.getProducts();
   }
   
  ngOnInit(): void {
    
  }

}
