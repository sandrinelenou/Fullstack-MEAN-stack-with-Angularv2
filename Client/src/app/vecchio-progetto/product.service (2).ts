
import { Injectable } from '@angular/core';

import { Product } from '../models/product';
import { PRODUCTS } from '../models/mock-products';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = "http://localhost:3000";
  private productUrl: string = 'http://localhost:3000/categories';

  products: Product[] = [];
  //injection service per metterlo visibile al component
  constructor(private http: HttpClient) { }
   
  //metodo chi ritorna i prodotti
  //create an injectable service to get products data, method that returns the heroes from mock.heroes.tsfor get products mock data
  getProducts():Product[]{
    return PRODUCTS;
  }
  

  public getProduct(id :any) {
    let products: Product[] = this.getProducts();
    return products.find(p => p.id == id);
  }

  //create product and save
  saveProduct(product: Product) {
    return this.getProducts().push(product);
  }

  addProduct(product: Product) {
    return this.http.get<Product>(this.api + '/products').pipe(
      catchError(this.handleError)
    );
  }
  handleError(handleError: any): import("rxjs").OperatorFunction<Product, any> {
    throw new Error('Method not implemented.');
  }
 
}











 //getProducts(): Promise<Product[]> {
  //  return Promise.resolve(PRODUCTS);
  //}

  //getProduct(id: number): Promise<Product[]>{
  //  return this.getProducts()
  //    .then((products: any[]) => products.find(product => product.id === id));
  //}


  //metodo chi ritorna i prodotti con observable
  //getProducts(): Observable<Product[]> {
  //  const products = of(PRODUCTS);
  //  return products;
  //}
