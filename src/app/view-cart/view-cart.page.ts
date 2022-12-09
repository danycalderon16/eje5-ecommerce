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


  ionViewWillEnter() {
    this.productsInCar = [];
    this.productService.getProducts().subscribe(res => {
      res.forEach(item => {
        let product = item as Product;
        if (product.inCar > 0) {
          this.productsInCar.push(product);
        }
      })
    });
  }


  async removeItem(id: string) {
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
            this.removeItemInCart(id);
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


  public removeItemInCart(id: string): void {
    this.productService.removeItemInCart(id);
    this.cartPrice = this.productService.calcularCartPrice()
  }

  public calculateCartPrice(): number {
    return this.productsInCar.reduce(function (accumulator, item) {

      return accumulator + item.inCar*item.precio;
    }, 0)
  }

  public substractItem(id: string) {
    this.productService.subtractToCartByID(id);
    this.cartPrice = this.productService.calcularCartPrice()
  }
  public addItem(item: Product) {
    this.productService.addToCartByID(item);
    this.cartPrice = this.productService.calcularCartPrice()
  }

}
