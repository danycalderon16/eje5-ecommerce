import { Component } from '@angular/core';
import { Product } from '../models/producto';
import { ProductService } from '../services/product.service';
import { AlertController, ToastController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public products: Product[];


  constructor(private productService: ProductService, private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,    
    private authService:AuthService, ) {

    this.products = productService.getProducts();
  }

  public getProductByID(clave: string): void {
    this.router.navigate(['/view-product'],
      {
        queryParams: { clave: clave }
      }
    )
  }

  public async presentToast(position: 'top' | 'middle' | 'bottom', message:string,callback) {
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

  public async logOut() {
    const alert = await this.alertController.create({
      header:'Atención',
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
              console.log(res);
              this.router.navigate(['..']);
            });
            this.presentToast('bottom',`Adios ${this.authService.getCurrentUser().displayName}`, 300);
          },
        },
      ],
    });
    await alert.present();
  }
}
