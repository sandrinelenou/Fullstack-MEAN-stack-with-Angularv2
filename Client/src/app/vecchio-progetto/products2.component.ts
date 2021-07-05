import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';   //per passare i parametri nel url o route
import { PRODUCTS } from '../models/mock-products';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  products = PRODUCTS;   //products = Array<any> = [];
  //products : PRODUCTS[] = [];
  //selectedProduct?: Product ;  // selectedProduct

  //dichiarare una variabile
  public selectedId: any;
  selectedProduct: Product | undefined;
  @Output() public childEvent = new EventEmitter();

  ////andiamo a consumare il servizio,Inject the ProductService productService parameter of type ProductuctService
  constructor(private productService: ProductService, private router: Router, private route : ActivatedRoute) { }
   
  //method to retrieve the products from the service.
  getProducts(): void {
    this.products = this.productService.getProducts();
  } 
  
  //goBack(): void {
  //  this.location.back();
  //}

  //call the method  chi prende id passati nel url e assegna a selectedId
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      let id = params.get("id");
      this.selectedId = id;
    /*this.route.paramMap.subscribe(params => {
      this.selectedId = params.get("id");*/
    });
   
  }

  // click event binding ,quando si clicca sul prodotto si assegna product a selectedProduct
  onSelect(product: Product) {
    this.childEvent.emit('Hey Sandrine');
    this.selectedProduct = product;
    this.router.navigate(['/products', product.id]);
    //this.router.navigate(['/products', this.selectedProduct.id]);
    //this.router.navigate(['/products', product.id, { test: 'testValue' }]);
    //console.log(product);

  }
   
  //se il prodotto è selezionato assegna a product.id id recuperato nel url o route con params.get('id')
  isSelected(product: { id: any; }) {
    return product.id === this.selectedId;     //   return productId === this.selectedId;
    
  }

}
