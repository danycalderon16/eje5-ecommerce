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
        descripcion: 'Refresco de 600 ml',
        precio: 32,
        photo: 'https://th.bing.com/th/id/OIP.tPOgjSGAlbpRvl_qL4i1AgAAAA?pid=ImgDet&rs=1',
        inCar: 0
      },
      {
        id: "1001",
        nombre: 'Pepsi',
        descripcion: 'Refresco pepsi de 600 ml',
        precio: 28,
        photo: 'https://www.movil.farmaciasguadalajara.com/wcsstore/FGCAS/wcs/products/819964_S_1280_F.jpg',
        inCar: 0
      },
      {
        id: "1003",
        nombre: 'Triki trakes',
        descripcion: 'Deliciosas galletas con chispas sabor a chocolate',
        precio: 15,
        photo: 'https://las.comercialtrevino.com/wp-content/uploads/2021/08/5743.jpg',
        inCar: 0
      },
    ]
  }
  public getProducts(): Product[] {
    return this.products
  }
  public addProduct(nombre: string, descripcion : string, precio : number, imagen : string) {
    let gId = ((parseInt(this.products[this.products.length-1].id))+1).toString()
    this.products.push({id:gId,nombre:nombre,descripcion:descripcion,precio:precio,photo:imagen,inCar:0});
    console.log(gId)
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
    let i:number;
    this.products.forEach((product,index)=>{
      if(product.id === id) i = index;
    })
    console.log(i);    
    this.products[i].inCar = 0;
  }
  public addToCartByID(id: string): void {
    let i:number;
    this.products.forEach((product,index)=>{
      if(product.id === id) i = index;
    })
    console.log(i);    
    this.products[i].inCar++;
  }
  public subtractToCartByID(id: string): void {
    let i:number;
    this.products.forEach((product,index)=>{
      if(product.id === id) i = index;
    })
    console.log(i);    
    this.products[i].inCar--;
  }


  public calcularCartPrice(): number {
    return this.products.reduce((acc, item) => acc + item.precio*item.inCar, 0)
  }

}
