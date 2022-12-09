import { Component, OnInit } from '@angular/core';
import { Product } from '../models/producto';
import { AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute,  Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {

  public product : Product
  public id:string;

  constructor(private productService: ProductService,private aroute : ActivatedRoute,private router: Router,
    private toastController: ToastController) { 
      this.product = {
        id:'',nombre:'',inCar:0,photo:'',descripcion:'',precio:0
      }
      this.aroute.queryParams.subscribe((params)=>{
        this.id = params.id;
        this.productService.getProductByID(params.id).subscribe(item=>{
          this.product = item as Product;
          this.product = {id:this.id,...this.product}        
          if(this.product.photo == null){
            this.product.photo = 'https://i.stack.imgur.com/l60Hf.png';
          }
        });
      });
    }

  ngOnInit() {
   
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
  

  public addToCart(item:Product):void{
    this.productService.addToCartByID(item);
    this.presentToast('bottom','Se agrego el producto corretamente',()=>{
      this.goToCar();
    });
  }
  public goToCar() {
    this.router.navigate(['/view-cart'])
  }

}
