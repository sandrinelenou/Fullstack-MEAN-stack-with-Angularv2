import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { Categorie } from '../../models/categorie';
import { CategorieService } from '../../services/categorie.service';


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  public categories: any ;
  public isLoading: boolean = false;   //private categoriesSub!: Subscription;   // public updatedCategories = new Subject<Categorie[]>();
  public id!: String;   
  public categorie: any;
  public form!: FormGroup;
  private IdFromRoute: any;
  @Input() searchTerm!: String;
   
constructor(
  private categorieService: CategorieService,
  private router: Router,
  private route: ActivatedRoute
) { }

  ngOnInit(): void {
    this.IdFromRoute = this.route.snapshot.paramMap.get('id');      
    this.getCategories();
    //this.editCategorie(this.IdFromRoute);
  }

  private getCategories():void {
    this.categorieService.getCategories().subscribe((categorieData: any) => {
      this.categories = categorieData.data;
    });
  }
  removeCategorie(categorieId: string) {
    this.categorieService.deleteCategorie(categorieId).subscribe(() => {
      this.getCategories();  //this.router.navigate(["/categories"]);
    });   
  }
  /*viewCategorie() {
    this.router.navigate(['/categories/view-categorie/', this.categorie.id], {
      queryParams: { 'searchTerm': this.searchTerm }
    });
  }
  editCategorie(id:String) {
    this.router.navigate(['/categories/edit-categorie', this.id]);
    console.log(id);
  }*/
  

 
}

















  /*public categoryList: Categorie[] = [];

  constructor(
    public categorieService: CategorieService,
    private activateRoute: ActivatedRoute) {
  }

  public getAllCategories() {
    let context = this;
    context.categorieService.getCategories()
      .subscribe(data => (context.categoryList= data));
  }

  ngOnInit() {
    let context = this;
    context.getAllCategories();
  }

  public deleteCase(categoryId: number) {
    let context = this;
    context.categorieService.deleteCategorie(categoryId).subscribe(data => {
    });
  } */

