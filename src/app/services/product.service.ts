import { Injectable } from '@angular/core';
import { Product } from '../models/producto';
import { map } from "rxjs/operators";
import { AngularFirestore, DocumentSnapshot } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products: Product[]
  constructor(private firestore: AngularFirestore,
    private auth: AuthService) {
    this.products = [
      {
        nombre: 'Coca-cola',
        descripcion: 'Refresco de 600 ml',
        precio: 32,
        photo: 'https://th.bing.com/th/id/OIP.tPOgjSGAlbpRvl_qL4i1AgAAAA?pid=ImgDet&rs=1',
        inCar: 0
      },
      {
        nombre: 'Pepsi',
        descripcion: 'Refresco pepsi de 600 ml',
        precio: 28,
        photo: 'https://www.movil.farmaciasguadalajara.com/wcsstore/FGCAS/wcs/products/819964_S_1280_F.jpg',
        inCar: 0
      },
      {
        nombre: 'Triki trakes',
        descripcion: 'Deliciosas galletas con chispas sabor a chocolate',
        precio: 15,
        photo: 'https://las.comercialtrevino.com/wp-content/uploads/2021/08/5743.jpg',
        inCar: 0
      },
    ]
  }
  public getProducts(): Observable<Product[]> {
    return this.firestore.collection(`users/${this.auth.getCurrentUser().uid}/products`).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  public async addProduct(product: Product): Promise<any> {
    const id = new Date().valueOf().toString();
    return new Promise((resolve, reject) => {
      this.firestore.collection(`users/${this.auth.getCurrentUser().uid}/products`).add(product)
        .then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        });
    });
  }

  public removeProduct(pos: number) {
    return this.products.splice(pos, 1);
  }
  public getProductByID(id: string){
    let item = this.firestore.doc(`users/${this.auth.getCurrentUser().uid}/products/${id}`).valueChanges();
    return item;
  }
  public removeItemInCart(item: Product): void {
    
  }
  public async addToCartByID(item: Product): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firestore.doc(`users/${this.auth.getCurrentUser().uid}/products/${item.id}`).update({ inCar: item.inCar + 1 })
        .then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        });
    });
  }
  public subtractToCartByID(item: Product): void {
   
  }


  public calcularCartPrice(): number {
    return this.products.reduce((acc, item) => acc + item.precio * item.inCar, 0)
  }

}
