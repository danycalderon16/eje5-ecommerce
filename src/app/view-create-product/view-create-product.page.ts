import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Product } from '../models/producto';

@Component({
  selector: 'app-view-create-product',
  templateUrl: './view-create-product.page.html',
  styleUrls: ['./view-create-product.page.scss'],
})
export class ViewCreateProductPage implements OnInit {
  nombre = ''
  descripcion = ''
  precio: number
  imagen = ''
  constructor(private productService: ProductService, private alertController: AlertController, private toastController: ToastController) {
  }

  ngOnInit() {
  }
  public async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position,
      cssClass: 'custom-toast'
    });

    await toast.present();
  }

  public addProduct() {
    let product:Product = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      photo: this.imagen,
      inCar:0
    }
    this.productService.addProduct(product).then(res=>{
      this.presentToast('bottom', '¡Se agrego el producto corretamente!');
      this.nombre = ''
      this.descripcion = ''
      this.precio = null
      this.imagen = ''
    });
  }
}

