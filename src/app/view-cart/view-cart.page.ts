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
  public productsInCar: Product[] = [];

  public cartPrice: number;

  constructor(private productService: ProductService, private toastController: ToastController, private alertController: AlertController) {
    productService.getProducts().subscribe(res => {
      
    this.productsInCar = [];
      res.forEach(item => {
        let product = item as Product;
        if (product.inCar > 0) {
          this.productsInCar.push(product);
        }
      })
      this.cartPrice = this.calculateCartPrice();
    });
  }

  ngOnInit(): void {    
  }

  ionViewDidLeave(){
    this.productsInCar = [];
  }
  ionViewWillLeave(){
    this.productsInCar = [];
  }
  ionViewWillUnload(){
    this.productsInCar = [];
  }
  ionViewWillEnter() {
    console.log('willEnter 0',this.productsInCar);
    
    // this.productsInCar = [];
    // this.productService.getProducts().subscribe(res => {
    //   res.forEach(item => {
    //     let product = item as Product;
    //     if (product.inCar > 0) {
    //       this.productsInCar.push(product);
    //     }
    //   })
    //   this.cartPrice = this.calculateCartPrice();
    // });
    // console.log('willEnter 1',this.productsInCar);
  }


  async removeItem(item: Product) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de borrar este prodcuto del carrito?',
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
            this.removeItemInCart(item);
            this.toast('bottom', 'Se elimino el producto corretamente');
          },
        },
      ],
    });

    await alert.present();
  }

  async toast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position,
      cssClass: 'custom-toast',
    });

    await toast.present();
  }


  public removeItemInCart(item: Product): void {
    this.productService.removeItemInCart(item);
    this.cartPrice = this.calculateCartPrice()
  }

  public calculateCartPrice(): number {
    return this.productsInCar.reduce(function (accumulator, item) {
      return accumulator + item.inCar*item.precio;
    }, 0)
  }

  public substractItem(item: Product) {
    this.productService.subtractToCartByID(item);
    this.cartPrice = this.calculateCartPrice()
  }
  public addItem(item: Product) {
    this.productService.addToCartByID(item);
    this.cartPrice = this.calculateCartPrice()
  }

}
