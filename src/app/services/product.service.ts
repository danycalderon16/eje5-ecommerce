import { Injectable } from '@angular/core';
import { Product } from '../models/producto';
import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products: Product[]
  constructor(private firestore: AngularFirestore,
    private auth:AuthService) {
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
  public getProductByID(clave: string): Product {
    let item: Product;
    item = this.products.find((product) => {
      return product.id === clave
    });

    return item;
  }
  public removeItemInCart(id: string): void {
    let i: number;
    this.products.forEach((product, index) => {
      if (product.id === id) i = index;
    })
    console.log(i);
    this.products[i].inCar = 0;
  }
  public addToCartByID(id: string): void {
    let i: number;
    this.products.forEach((product, index) => {
      if (product.id === id) i = index;
    })
    console.log(i);
    this.products[i].inCar++;
  }
  public subtractToCartByID(id: string): void {
    let i: number;
    this.products.forEach((product, index) => {
      if (product.id === id) i = index;
    })
    console.log(i);
    this.products[i].inCar--;
  }


  public calcularCartPrice(): number {
    return this.products.reduce((acc, item) => acc + item.precio * item.inCar, 0)
  }

}
