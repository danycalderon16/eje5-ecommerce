import { Component } from '@angular/core';
import { Product } from '../models/producto';
import { ProductService } from '../services/product.service';
import { AlertController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public products: Product[];


  constructor(private productService: ProductService, private router: Router) {

    this.products = productService.getProducts();
  }

  public getProductByID(clave: string): void {
    this.router.navigate(['/view-product'],
      {
        queryParams: { clave: clave }
      }
    )
  }

  public addToCart(pos:number):void{
    this.productService.addToCart(pos);
  }

  public goToCar() {
    this.router.navigate(['/view-cart'])
  }

  public addNewProduct():void{
    this.router.navigate(['/view-create-product'])
  }
}
