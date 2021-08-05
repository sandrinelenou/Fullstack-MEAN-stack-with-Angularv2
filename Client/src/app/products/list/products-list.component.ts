import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
 @Input() productList: Product[] = [];
 products: Product[] = [];
 private productsSub: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private _activateRoute: ActivatedRoute,
    private router: Router
  ) { }



  ngOnInit(): void{
    this.productService.getProducts();
    //this.isLoading = true;
    this.productsSub = this.productService.getProductUpdateListener()
      .subscribe((products: Product[]) => {
       // this.isLoading = false;
        this.productList = products;
      });
  }

  public deleteCase(productId: number) {
    let context = this;
    context.productService.deleteProduct(productId);
  }

}
