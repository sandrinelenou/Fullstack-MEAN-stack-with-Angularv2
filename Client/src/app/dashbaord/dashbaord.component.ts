import { Component, OnInit } from '@angular/core';
//import { PRODUCTS } from '../models/mock-products';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.css']
})
export class DashbaordComponent implements OnInit {

  products : Product[] = [];

  constructor(private productService: ProductService) { }

  getProducts(): void {
  this.productService.getProducts();
  }
  ngOnInit(): void {
    this.getProducts();
  }


}
