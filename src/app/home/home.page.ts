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


  constructor(private productService: ProductService, private router: Router,
    private toastController: ToastController,private alertController: AlertController) {

    this.products = productService.getProducts();
  }

  public getProductByID(clave: string): void {
    this.router.navigate(['/view-product'],
      {
        queryParams: { clave: clave }
      }
    )
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message:string,callback) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: 'Ver carrito',
          handler: () => {               
            callback();
          }
        }
      ]
    });

    await toast.present();
  }
  
  
  public addToCartByID(id:string):void{
    this.productService.addToCartByID(id);
    this.presentToast('bottom','Se agrego el producto corretamente',()=>{
      this.goToCar();
    });
  }

  public goToCar() {
    this.router.navigate(['/view-cart'])
  }

  public addNewProduct():void{
    this.router.navigate(['/view-create-product'])
  }
}
