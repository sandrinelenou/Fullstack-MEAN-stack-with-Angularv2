import { Injectable } from '@angular/core';

import { Product } from '../models/product';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [];
  private productsUpdated = new Subject<Product[]>();

//endpoind api
  //private BACKEND_URL = "http://localhost:3000/api/product";
  private api = "http://localhost:3000/api/product";
  public product: Product[] = [];


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /*public getProducts(): Observable<Product[]>{
    let context = this;
    return context.http.get<Product[]>(context.api + '/list');
  }*/


  public getProducts() {
    this.http.get<{ message: string, products: Product[] }>(this.api + '/list')
      .pipe(
        map((productData: any) => {
        return productData.products.map((product : { name: string; description: string;price: number; _id: string; }) => {
             //We already stripped out the message, but we also need to convert every post, and we will do this with the normal javascript method. This map() method can be added to any array
          return {
            name: product.name,
            description: product.description,
            price: product.price,
            id: product._id
          }
        });
      }))
      .subscribe((transformedProduct) => {
        this.products = transformedProduct;
        this.productsUpdated.next([...this.products]);   // We also need to update our subscribe code. We just replaced the postData with transformedPost and assigned it to the this.postsa che cosa serve questa ? per fare andare avanti il progetto? come next()?
      });

  }


  public createProduct(product: Product): Observable<Product> {
    let context = this;
    return context.http.post <Product>(context.api + '/create', JSON.stringify(product), context.httpOptions);
  }
    errorHandler(errorHandler: any): import("rxjs").OperatorFunction<Product, any> {
        throw new Error('Method not implemented.');
    }

  public getProductById(productId: number): Observable<Product> {  //se il type è any non funziona
    let context = this;
    return context.http.get<Product>(context.api + '/' + productId);
  }

  public updateProduct(productId: number, product: Product): Observable<Product> {
    let context = this;
    return context.http.put<Product>(context.api + '/update/' + productId, JSON.stringify(product), context.httpOptions);

  }
  public deleteProduct(productId: number): Observable<Product> {
    let context = this;
    return context.http.delete<Product>(context.api + '/delete/' + productId);

  }
  public getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }



}
