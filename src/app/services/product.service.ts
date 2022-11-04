import { Injectable } from '@angular/core';
import { Product } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[]
  constructor() {
    this.products = [
      {
        id: "1000",
        nombre: 'Coca-cola',
        descripcion: 'Es refrescante',
        precio: 10,
        photo: 'https://picsum.photos/200',
        inCar:0
      },
      {
        id: "1001",
        nombre: 'Pepse',
        descripcion: 'Es refrescante',
        precio: 10,
        photo: 'https://picsum.photos/200',
        inCar:2
      }
    ]
  }
  public getProducts(): Product[] {
    return this.products
  }
  public addProduct(product: Product) {
    this.products.push(product);
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

}
