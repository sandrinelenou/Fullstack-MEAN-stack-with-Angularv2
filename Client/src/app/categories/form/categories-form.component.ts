import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';  //fundamentale per le form
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Categorie } from '../../models/categorie';
import { CategorieService } from '../../services/categorie.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})

export class CategoriesDataFormComponent implements OnInit {

  public form!: FormGroup;
  public id: any;
  private categoryId: any;     //id from route public id!: string;
  public isAddMode: any; //!: boolean;
  public  isLoading = false;
  public categorie!: Categorie;
  private mode = 'create';   //default
  public categorieDetails: any;


  constructor(
     private categorieService: CategorieService,
     public route: ActivatedRoute,
     private router: Router,
     //private formBuilder: FormBuilder
   ) { }

 ngOnInit(): void {
  let context = this;
  switch (context.mode) {
    case 'ADD':
      context.createCategorie();
      break;
    case 'EDIT':
      context.updateCategorie(this.id,this.categorieDetails);
      break;

  }
  this.id = this.route.snapshot.params['categoryId'];

  this.form = new FormGroup({
    title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
    content: new FormControl(null, { validators: [Validators.required] })
 });

 this.route.paramMap.subscribe((paramMap: ParamMap) => {
  if (paramMap.has('id')) {
    this.mode = 'edit';
    this.categoryId = paramMap.get('id');

    this.isLoading = true;            //loading spinner initial
    this.categorieService.getCategorie(this.id).subscribe((categorieData:any) => {
      this.isLoading = false;
      this.categorie = { id: categorieData.data._id, title: categorieData.data.title, content: categorieData.data.content };   //_id comming from the db
      this.form.setValue(
        {
         title: this.categorie.title,
         content: this.categorie.content
        });         // allow us to ovveride the value form your form control when we want to update
    });
  } else {
    this.mode = 'create';
    this.categoryId = null;
  }
});


  }
  get f(){
    return this.form.controls;
  }


 onSavePost() {
     if (this.form.invalid) {
       return;
  }

     this.isLoading = true;
     if(this.mode === 'create'){    //if(this.mode == 'ADD'){
      this.createCategorie();

     }else{
      this.updateCategorie(this.id, this.form.value);
    }

}

private createCategorie(){
  console.log(this.form.value);
  this.categorieService.createCategorie( this.form.value ).subscribe(res => {
    console.log('Categorie created successfully!');
    this.router.navigateByUrl('/categories');
  })
  }


private updateCategorie(id: string, categorie: Categorie){
  console.log(this.form.value);
  this.categorieService.updateCategorie( id,this.form.value).subscribe(res => {
    console.log('Categorie update successfully!');
    this.router.navigateByUrl('/categories');
  })
  }

  private getCategorie() {
    let context = this;
    context.categorieService.getCategorie(context.id).subscribe((productdata: any) => {
      context.categorieDetails = productdata.data;
      console.log(context.categorieDetails);
    });
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


