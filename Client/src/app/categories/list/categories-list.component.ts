import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Categorie } from '../../models/categorie';
import { CategorieService } from '../../services/categorie.service';


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  public categories: any ;
  public isLoading: boolean = false;

constructor(
  private categorieService: CategorieService,
  private router: Router) { }

 ngOnInit(): void {
  this.isLoading = true;
  this.categorieService.getCategories().subscribe((res: any) => {
    this.categories =res.data;
    console.log(this.categories);
  });
}

 removeCategorie(categorieId: string) {
    this.categorieService.deleteCategorie(categorieId).subscribe(res => {
     //this.categories = this.categories.filter((item :any) => item.id !== categorieId);
      this.router.navigate(['/categories']);
         console.log('categorie deleted successfully!');

    })
 }
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

