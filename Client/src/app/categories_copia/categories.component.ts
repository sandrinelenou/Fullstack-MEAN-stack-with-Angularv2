import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';
import { CategorieService } from '../services/categorie.service';


export class Categories {
  id: number | undefined;
  name: string | undefined;
  
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  //posts: [] | undefined;  // va bene per fetchData
  categoryList: Categorie[] = [];

  constructor(
    public categorieService: CategorieService,
    //private router: Router,
    private activateRoute: ActivatedRoute) {
    
  } 

  //andiamo a consumare il servizio
  public getAllCategories() {
    //his.categories = this.categorieService.getCategories();
    this.categorieService.getCategories()
      .subscribe(data => (this.categoryList= data));  
  }
  

  ngOnInit() {
    this.getAllCategories();   
    
  } 

    
  

}




  //deleteCategorie(categorieId: number) {
  //  //const routeParams = this.route.snapshot.paramMap;
  //  //const categorieIdFromRoute = Number(routeParams.get('id'));
  //  this.activateRoute.params.subscribe(data => {
  //    this.categoryId = data.id;   // get the exixting data of the category

  //    console.log("categorie " + this.categoryId);

  //    this.categorieService.deleteCategorie(categorieId).subscribe(deleteCatData => {
  //      console.log("Deleted categorie " + this.categoryId);
  //    });
  //  });


  //}



/*
  //  fetchData: function(){
  //this.http.get("").subscribe(
  //  (res: Response) => { this.products = res, json(); }
  //   )
  //}
 *
 *
 * //this.fetchData();
    this.http.get(this._url).subscribe(posts => {
      this.posts = posts;        //subscribe(posts => {this.posts = posts});
      console.log(this.posts)
    });
 *
 * ngOnInit(): void {
//  this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
//    this.posts = data;
//    //console.log(this.posts);
//  });*/

