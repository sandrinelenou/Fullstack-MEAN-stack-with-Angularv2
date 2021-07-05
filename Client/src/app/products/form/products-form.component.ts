import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {

  @Input() name: string | undefined;

  public mode: string | undefined;
  private productIdFromRoute: any;
  public pageTitle: string = '';
  //public productDetails: Product  ;
  public productDetails: Product = new Product();

  constructor(
    private productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    let context = this;
    context._activatedRoute.data.subscribe(param => {
      if (typeof param.mode != 'undefined') {
        context.mode = param.mode;
      }
    });
    context.productIdFromRoute = this._activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    let context = this;
    switch (context.mode) {
      case 'ADD':
        context.addCase();
        break;
      case 'EDIT':
        context.editCase();
        break;
      case 'VIEW':
        context.viewCase();
        break;
    }

  }

  private getProductData() {
    let context = this;
    context.productService.getProductById(context.productIdFromRoute).subscribe(productdata => {
      context.productDetails = productdata;
      console.log(context.productDetails);
    });
  }

  private viewCase() {
    let context = this;
    context.pageTitle = 'View prodotti';
    context.getProductData();
  }

  private addCase() {
    let context = this;
    context.pageTitle = 'Crea Prodotti';
  }

  private editCase() {
    let context = this;
    context.pageTitle = 'Modifica prodotti';
    context.getProductData();
  }

  public goBack() {
    let context = this;
    context.router.navigate(['/products']);
  }

  public submitProduct(): void {

    let context = this;
    let productObject = {
      id: context.productDetails.id,
      name: context.productDetails.name,
      description: context.productDetails.description,
      price: context.productDetails.price
    };

    if (context.mode == 'EDIT') {
      context.productService.updateProduct(context.productIdFromRoute, productObject).subscribe(data => {
        context.router.navigate(['/products']);
      });
    } else {
      this.productService.createProduct(productObject).subscribe(data => {
        context.router.navigate(['/products']);
      });
    }
  }


}
