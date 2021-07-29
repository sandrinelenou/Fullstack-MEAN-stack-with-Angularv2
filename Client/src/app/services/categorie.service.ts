import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject, throwError} from 'rxjs';
import { Categorie } from '../models/categorie';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

    private BACKEND_URL = "http://localhost:3000/api/categorie";
     categoriesUrl : string = 'http://localhost:3000/api/categorie/list';
    public categories: Categorie[] = [];
    private categoriesUpdated = new Subject<Categorie[]>();

     httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
       })
    }

    constructor(private http: HttpClient, private router: Router) { }

    getCategories(): Observable<Categorie[]>{
      return this.http.get<Categorie[]>(this.BACKEND_URL + '/list')
      .pipe(catchError(this.errorHandler));
    }

    getCategorie(id: any): Observable<Categorie> {
      return this.http.get<Categorie>(this.BACKEND_URL  + id)
      .pipe(
        catchError(this.errorHandler)
      )
    }

  createCategorie(categorie: Categorie): Observable<Categorie> {
   return this.http.post<Categorie>(this.BACKEND_URL + '/create', JSON.stringify(categorie),this.httpOptions)
   .pipe(
    catchError(this.errorHandler)
  )
  }

  updateCategorie(id: string, categorie: Categorie): Observable<Categorie>{
     return this.http.put<Categorie>(this.BACKEND_URL+ '/update/' + id,JSON.stringify(categorie),this.httpOptions )
       .pipe(catchError(this.errorHandler))
    }

  deleteCategorie(categorieId: string) : Observable<Categorie>{
    return this.http.delete<Categorie>(this.BACKEND_URL + '/delete/' + categorieId,this.httpOptions)
    .pipe(catchError(this.errorHandler))
  }


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }



}
