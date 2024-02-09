import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
  public isLoading = false;
  public isSubmitted = false;
  public categorie!: Categorie;
  public mode = "create";   //default
  public param!: String;
  private categoryId: any;     //id from route public id!: string;
  public categorieDetails: any;
  public pageTitle!: String;
    title: any;
    content: any;



  constructor(
     private categorieService: CategorieService,
     public route: ActivatedRoute,
    private router: Router,
   // private fb: FormBuilder
     //private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {

    let context = this;
    switch (this.mode) {
      case 'ADD':
        context.pageTitle = "Create Categorie";
        this.createCategorie();
        break;
      case 'EDIT':
        context.pageTitle = "Update categorie";
        this.updateCategorie();
        break;
    }
   //this.id = this.route.snapshot.params['categoryId'];

  this.form = new FormGroup({
    title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
    content: new FormControl(null, { validators: [Validators.required] })
  });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      //const categoryId = +parameterMap.get('id')!;
      if (paramMap.has('categoryId')) {
        this.mode = "EDIT";
        this.categorieService.getCategorie(this.categoryId).subscribe((categorieData: any) => {
          this.categorie = {
            id: categorieData.data._id,
            title: categorieData.data.title,
            content: categorieData.data.content
          }
          this.form.setValue({
            title: this.categorie.title,
            content: this.categorie.content
          });
        });
      } else {
        this.mode = "ADD";
        this.categoryId = null;
      }

  });


  }
  get f(){
    return this.form.controls;
  }

  onImagePicked(event: Event) {
    //const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      //avatar: file
    });
    this.form.get('image')!.updateValueAndValidity();
  }

  onSavePost() {
    console.log(this.form.value)
    this.isSubmitted = true;
     if (this.form.invalid) {
       return;
     }
     this.isLoading = true;
    if (this.mode === "ADD") {    //if(this.mode == 'ADD'){
      //console.log(this.form.value);
      this.createCategorie();
      alert('Created successfully!');
    } else {
      console.log(this.form.value);
      this.updateCategorie();
    }
    this.form.reset();
  }

  private getCategorie(id: string) {
    if (this.id === 0) {
      this.categorie = {
        id: '',
        title: '',
        content: ''
      };
    } else {
      let context = this;
      context.categorieService.getCategorie(context.id).subscribe((categorieData: any) => {
        context.categorieDetails = categorieData.data;
        console.log(context.categorieDetails);
      });
    }
  }

private createCategorie(){
    this.categorieService.createCategorie( this.form.value ).subscribe(res => {
    console.log('Categorie created successfully!');
    this.router.navigateByUrl('/categories');
  })
  }

  private updateCategorie() {
  console.log(this.form.value);
    this.categorieService.updateCategorie(this.categoryId, this.form.value).subscribe(res => {
      console.log('Categorie update successfully!');
      this.router.navigateByUrl('/categories');
    });
  }




}









 /*
  *
    this.form.valueChanges.subscribe(value => {
      console.log(value);
    });
    this.form.get('content')?.valueChanges.subscribe(value => {
      console.log(value);
    });
  *  if (parameterMap.has('categoryId')) {
    this.mode = 'EDIT';



    this.isLoading = true;            //loading spinner initial
    this.categorieService.getCategorie(this.categoryId).subscribe((categorieData:any) => {
      this.isLoading = false;

      this.categorie = {
        id: categorieData.data._id,
        title: categorieData.data.title,
        content: categorieData.data.content
       };   //_id comming from the db
      this.form.setValue(
        {
         'title': this.categorie.title,
         'content': this.categorie.content
        });         // allow us to ovveride the value form your form control when we want to update
    });
  } else {
    this.param = "ADD";
    this.categoryId = null;
  }
  *
  * public newCategorie = {
    id: '',
    title: '',
    content: ''
  }
  onSubmit(): void {
    console.log('submitted: ', this.newCategorie);
    this.categorieService.createCategorie(this.newCategorie).subscribe(added => {
      console.log(added);
      this.router.navigate(["/categories"]);
    });
  }
  }*/


