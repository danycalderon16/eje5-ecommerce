import { Component, OnInit } from '@angular/core';
import { Product } from '../models/producto';
import { AlertController, ToastController } from '@ionic/angular';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.page.html',
  styleUrls: ['./view-cart.page.scss'],
})

export class ViewCartPage implements OnInit {
  public productsInCar:Product[];

  public cartPrice:number;

  constructor(private productService: ProductService,private toastController: ToastController,private alertController: AlertController) {
    this.productsInCar= productService.getProducts();
    this.cartPrice = productService.calcularCartPrice()
   }
   
  ngOnInit(): void {
    
  }

  async removeItem(id:string) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de borrar esta prodcuto del carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Sí',
          role: 'confirm',
          handler: () => {
            this.removeItemInCart(id);
            this.toast('bottom','Se elimino el producto corretamente');
          },
        },
      ],
    });

    await alert.present();
  }

  async toast(position: 'top' | 'middle' | 'bottom', message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position,
      cssClass: 'custom-toast',
    });

    await toast.present();
  }


  public removeItemInCart(id:string):void{
    this.productService.removeItemInCart(id);
    this.cartPrice = this.productService.calcularCartPrice()
  }

  public calculatecartPrice():void{
    this.cartPrice = this.productService.calcularCartPrice()
  }

  public substractItem(id:string){
    this.productService.subtractToCartByID(id);
    this.cartPrice = this.productService.calcularCartPrice()
  }
  public addItem(id:string){
    this.productService.addToCartByID(id);
    this.cartPrice = this.productService.calcularCartPrice()
  }

}
