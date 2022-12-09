import { Component } from '@angular/core';
import { Product } from '../models/producto';
import { ProductService } from '../services/product.service';
import { AlertController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public products: Product[];
  public user: User;


  constructor(private productService: ProductService, private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private authService: AuthService,) {
    this.user = authService.getCurrentUser()
    this.productService.getProducts().subscribe(res => {
      this.products = res;
      if (this.products.length === 0) {
        productService.products.forEach(product => {
          productService.addProduct(product).then(res => {
          });
        });
      }
    });
  }

  public getProductByID(id: string): void {
    this.router.navigate(['/view-product'],
      {
        queryParams: { id: id }
      }
    )
  }

  public async presentToast(position: 'top' | 'middle' | 'bottom', message: string, callback) {
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
  public async simpleToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position,
      cssClass: 'custom-toast'
    });

    await toast.present();
  }


  public addToCartByID(item: Product): void {
    this.productService.addToCartByID(item).then(res => {
      this.presentToast('bottom', 'Se agrego el producto corretamente',()=>this.goToCar());
    });
  }

  public goToCar() {
    this.router.navigate(['/view-cart'])
  }

  public addNewProduct(): void {
    this.router.navigate(['/view-create-product'])
  }

  public async logOut() {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: '¿Está seguro de salir de la sesión?',
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
            this.authService.logOut().then(res => {
              this.router.navigate(['login']);
            });
            this.simpleToast('bottom', `Adios ${this.user.displayName}`);
          },
        },
      ],
    });
    await alert.present();
  }
}
