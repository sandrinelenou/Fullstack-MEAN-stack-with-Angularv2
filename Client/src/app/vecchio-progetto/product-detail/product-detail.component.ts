import { Component, Input, OnInit, Output} from '@angular/core'; //aggiungi Input 
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';   //ActivatedRoute  per extrare i parametri della route
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product | undefined;   //@input decorator questa ci permette di passare i data da un component all'altro passing data be
  @Output() public childEvent: any; //@Output decorator segnala che questa variabile verra passata dal figlio al genitore child to parent

  // creare una nuova variabile
  public productId: any;  //Getting Product id from URL
 
 
  products: Product[] | undefined;
  
    //productService: any;
  
  selectedId: string | null | undefined;
   productIdFromRoute: any;    

  //instanziare activatedRoute 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private location: Location
  ) { }

  //getProducts(): void {
  //  this.products = this.productService.getProducts();
  //}

/* Using Subscribe */
  //Update the ngOnInit() method to access the ActivatedRoute and track the id parameter
  //instanziare activatedRoute for getting route information
  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));

    // Find the product that correspond with the id provided in route.
   // this.product = this.productService.getProducts().find(product => product.id === productIdFromRoute);

  }

  // torna alla pagina products al click su goBack
  goBack() {
    //const routeParams = this.route.snapshot.paramMap;
    //const productIdFromRoute = Number(routeParams.get('id'));
      let selectedId = this.productIdFromRoute ? this.productIdFromRoute : null;
    this.router.navigate(['/products', { id: selectedId,  test2: 'testValue' }]);   //another parameter { id: selectedId , test2: 'testValue2'}
  }
  goBack1() {
    this.location.back();
  }
 
  

}

















  //this.products = this.productService.getProducts();
      //this.sub = this.route.paramMap.subscribe(params => { this.id = +params['id'] });

/*
    //this.route.paramMap.subscribe(params => {
    //  let id = params.get("id");
    //  this.selectedId = id;
    //  /*this.route.paramMap.subscribe(params => {
    //    this.selectedId = params.get("id");*/
    //});

    //solo per prendere id nella route
      //this.route.paramMap.subscribe(params => {
      //  this.productId = params.get("id")   
      //});

  // this.route.params.switchMap(params: Params) =>
  //    this.productService.getProduct(+params['id'])).subscribe((product: Product | undefined) => this.product = product);
 /*
 * let id = +this.route.snapshot.params['id'];
    this.productService.getProduct(id).subscribe((result: Product | undefined) => this.product = result);
 *
 * this.route.queryParams.subscribe(params => {
  this.id = params['id'];
});*/
      //this.route.params.switchMap(params: Params) =>
      //this.productService.getProduct(+params['id'])).subscribe((product: Product | undefined) => this.product = product);
