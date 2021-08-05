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
  public categories: any;    //public categories: Categorie[] = [];
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
      return this.http.get<Categorie>(this.BACKEND_URL +'/' + id)
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
    .pipe(catchError(this.errorHandler));
  }
  /*deleteCategorie(categorieId: string) {
    return this.http.delete<Categorie>(this.BACKEND_URL + '/delete/' + categorieId,this.httpOptions).subscribe(() => {
    this.categoriesUpdated = this.categories.filter((categorie :any) => categorie.id !== categorieId);   //For live updating,  La funzione filter () ci permette di restituire solo un sottoinsieme di quell'array di post. Passeremo la funzione come argomento alla funzione di filtro. Questa funzione verrà eseguita per ogni post nell'array. Se restituisce true, l'elemento post verrà mantenuto, ma se restituisce false, l'elemento non farà parte del nuovo array di post filtrato che abbiamo memorizzato nei post aggiornati.
    this.categories = this.categoriesUpdated;   //Ora, la nostra interfaccia utente frontend verrà aggiornata quando elimineremo un post
    this.categoriesUpdated.next([...this.categories]);   //send the copy of post, Ora, dobbiamo anche comunicare alla nostra app questo aggiornamento alla nostra app
    //this.router.navigate(["/categories"]);
     console.log('deleted successfully!');

   });
  }*/


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


/*
 Observable consentono ai moduli(categorie) di fare una richiesta asynchrono e al termine della richiesta ,
 subscribe si inscribe alle notifiche della richiesta quando la richiesta funziona */
