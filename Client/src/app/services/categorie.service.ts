import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
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
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    }

    constructor(private http: HttpClient, private router: Router) { }

     getCategories() {
     return this.http.get<{message:String, categories:any}>(this.categoriesUrl)
     .pipe(
       map(categorieData => {
          return categorieData.categories.map((categorie: any) => {
            return {
              title: categorie.title,
              content: categorie.content,
              id: categorie._id,
            }
          })
       })
     )/*.subscribe(transformedCategories => {
       this.categories = transformedCategories;
       this.categoriesUpdated.next([...this.categories]);   // We also need to update our subscribe code. We just replaced the postData with transformedPost and assigned it to the this.postsa che cosa serve questa ? per fare andare avanti il progetto? come next()?
       console.log(transformedCategories);
     }, err => {
       console.log(err);
     });*/
   }

  viewCategorie(categorieId: number): Observable<Categorie> {
    return this.http.get<Categorie>(this.BACKEND_URL  + categorieId);
  }

  getCategoryById(id: string){
    return this.http.get<{_id:String, title:String, content:string, imagePath:string, creator:string}>(this.BACKEND_URL +'/'+ id);
  }

  createCategorie(title:string, content:string) {
    const categorieData = new FormData();
    categorieData.append("title", title);
    categorieData.append("content", content);

   this.http.post<{message:String, categorie: Categorie}>(this.BACKEND_URL + '/create', categorieData,this.httpOptions).subscribe(responseData =>{
      this.router.navigate(["/categories"]);
    },err => {
      console.log(err);
    });
  }

  updateCategorie(id: string, title:string, content:string){
    let categorieData : Categorie | FormData;
    categorieData = new FormData();
    categorieData.append("id", id);
    categorieData.append("title", title);
    categorieData.append("content", content);
     this.http.put(this.BACKEND_URL+ '/update/' + id, categorieData).subscribe(response => {
       this.router.navigate(["/categories"]);
     },err => {
      console.log(err);
    });

    }

  deleteCategorie(categorieId: string) {
    this.http.delete(this.BACKEND_URL + '/delete/' + categorieId,this.httpOptions).subscribe((data) =>{
      this.router.navigate(["/categories"]);
    },err => {
      console.log(err);
    });
  }

  public getCatgorieUpdateListener() {
    return this.categoriesUpdated.asObservable();
  }

}
