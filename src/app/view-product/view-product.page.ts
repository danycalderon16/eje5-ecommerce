import { Component, OnInit } from '@angular/core';
import { Product } from '../models/producto';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  public product : Product

  constructor(private productService: ProductService,private aroute : ActivatedRoute ) { }

  ngOnInit() {
    this.aroute.queryParams.subscribe((params)=>{
      console.log(params);
      
      this.product = this.productService.getProductByID(params.clave)
      console.log(this.product)
      if(this.product.photo == null){
        this.product.photo = 'https://i.stack.imgur.com/l60Hf.png';
      }
    });
  }

}
