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
     categoriesUrl : string = 'http://localhost:3000/categories';
    public categories: Categorie[] | undefined;

     httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    }

    constructor(private http: HttpClient) { }

    public getCategories(): Observable<Categorie[]> {
      return this.http.get<Categorie[]>(this.categoriesUrl);
    }

  viewCategorie(categorieId: number): Observable<Categorie> {
    return this.http.get<Categorie>(this.apiServer + '/categories/' + categorieId);
  }

    createCategorie(categorie: Categorie): Observable<Categorie> {
      return this.http.post<Categorie>(this.apiServer + '/categories/', JSON.stringify(categorie), this.httpOptions);

    }

  updateCategorie(categoryId: number, categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(this.apiServer + '/categories/' + categoryId, JSON.stringify(categorie), this.httpOptions);

    }

  deleteCategorie(categorieId: number): Observable<Categorie> {
    return this.http.delete<Categorie>(this.apiServer + '/categories/' + categorieId, this.httpOptions);

  }

}
