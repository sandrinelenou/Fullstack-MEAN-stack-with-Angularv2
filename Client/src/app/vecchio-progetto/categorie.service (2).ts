import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

    private apiServer = "http://localhost:3000";
    //const url = `${this.categoriesUrl}/${id}`; // DELETE api/heroes/42
   //categoriesUrl =' /asset/data/db.json' ;
    categoriesUrl : string = 'http://localhost:3000/categories';

    categories: Categorie[] | undefined;

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

  //dependency injection, injecter le service
    constructor(private http: HttpClient) { }

    ///** GET heroes from the server sendGetRequest , consuming the json rest API*/
    public getCategories(): Observable<Categorie[]> {
      return this.http.get<Categorie[]>(this.categoriesUrl);      //.map((response: Response))
    }


    //detail categorie by id
  viewCategorie(categorieId: number): Observable<Categorie> {
    return this.http.get<Categorie>(this.apiServer + '/categories/' + categorieId)
        .pipe(
          catchError(this.errorHandler)
        )
    }
      errorHandler(errorHandler: any): import("rxjs").OperatorFunction<Categorie, any> {
          throw new Error('Method not implemented.');
    }

    //create categorie
    createCategorie(categorie: Categorie): Observable<Categorie> {
      return this.http.post<Categorie>(this.apiServer + '/categories/', JSON.stringify(categorie), this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        )
    }

   //this.activateRoute.params.subscribe(data => {
   //  this.categoryId = data.id;
   //})
    //update categorie
  updateCategorie(categoryId: number, categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(this.apiServer + '/categories/' + categoryId, JSON.stringify(categorie), this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        )
    }

  /** DELETE: delete the categorie from the server */
  deleteCategorie(categorieId: number): Observable<Categorie> {
    return this.http.delete<Categorie>(this.apiServer + '/categories/' + categorieId, this.httpOptions)
        .pipe(
          catchError(this.errorHandler)
        )
    
  }



}














  //legge id
  //public getCategory(id: number): Observable<Categorie> {  //const baseUrl = 'http://localhost:3000/categories/'+categoryId;
  //  this.categoriesUrl =   '${this.categoriesUrl}/${id}';    // const heroesURL = `${this.heroesURL}?${term}`;
  //  return this.http.get<Categorie>(this.categoriesUrl)
  //    ;
  //}
  //getCategory(id: number): void {
  //  this.categorieService.getCategory(id).subscribe({
  //    next: (categorie: Categorie | undefined) => this.categorie = categorie,
  //  });
  //}

// private _url: string = "http://localhost:3004/categories";
  //getCategories() {
  //  //  //this.fetchData();
  //  return this.http.get(this._url).subscribe(categories => {
  //    this.categories = categories;        //subscribe(posts => {this.posts = posts});
  //    console.log(this.categories)
  //  });
  //}
  //  //return this.http.get(this._url);
  // // return this.http.get<Categories[]>(`${this._url}`);
  //}
