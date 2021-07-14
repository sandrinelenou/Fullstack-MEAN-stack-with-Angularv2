import { Component, Input, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';  //fundamentale per le form
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../../models/categorie';
import { CategorieService } from '../../services/categorie.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})

export class CategoriesDataFormComponent implements OnInit {


  form!: FormGroup;

  constructor(
     private ps: CategorieService,
     public route: ActivatedRoute,
     private router: Router
   ) { }

 ngOnInit(): void {
  this.createForm()
  }

 createForm() {
     this.form = new FormGroup({
       title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
       content: new FormControl(null, { validators: [Validators.required] })
     });
   }

 onSavePost() {
     if (this.form.invalid) {
       return;
     }
  this.ps.createCategorie( this.form.value.title,  this.form.value.content )
    this.form.reset();
    this.router.navigate(["/categories"]);
    }
}











 /* @Input() name: string | undefined;

  public mode: string | undefined;
  private categorieIdFromRoute: any;
  public categorieDetails: Categorie = new Categorie();
  public pageTitle: string = '';


  constructor(
    private categorieService: CategorieService,
    private router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    let context = this;
    context._activatedRoute.data.subscribe(param => {
      if (typeof param.mode != 'undefined') {
        context.mode = param.mode;
      }
    });
    context.categorieIdFromRoute = this._activatedRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    let context = this;
   // context.categorieDetails.name = '';
    switch (context.mode) {
      case "ADD":
        context.addCase();
        break;
      case "EDIT":
        context.editCase();
        break;
      case "DETAIL":
        context.viewCase();
        break;
    }
  }

  private getCategoryData() {
    let context = this;
    context.categorieService.viewCategorie(context.categorieIdFromRoute).subscribe(categoriedata => {
      context.categorieDetails = categoriedata;
    });
  }

  private viewCase() {
    let context = this;
    context.pageTitle = 'View categoria';
    context.getCategoryData();
  }

  private addCase() {
    let context = this;
    context.pageTitle = 'Crea categoria';
  }

  private editCase() {
    let context = this;
    context.pageTitle = 'Modifica categoria';
    context.getCategoryData();
  }

  public goBack() {
    let context = this;
    context.router.navigate(['/categories']);
  }

  public submitCategorie(): void {

    let context = this;
    let categorieObject = {
      id: context.categorieDetails.id,
      name: context.categorieDetails.name
    };

    if (context.mode == 'EDIT') {
      context.categorieService.updateCategorie(context.categorieIdFromRoute, categorieObject).subscribe(data => {
        context.router.navigateByUrl('/categories');
      });
    } else {
      context.categorieService.createCategorie(categorieObject).subscribe(data => {
        context.router.navigateByUrl('/categories');
      });
    }

  }*/


