import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; /*ActivatedRoute serve per retrieve data params from route o url, Router per reindirizzare verso un altra pagina*/
import { Categorie } from '../../models/categorie';
import { CategorieService } from '../../services/categorie.service';
import { Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-categorie-detail',
  templateUrl: './categorie-detail.component.html',
  styleUrls: ['./categorie-detail.component.css']
})
export class CategorieDetailComponent implements OnInit {

  @Input() name: string | undefined; id:number | undefined;  //@input decorator questa ci permette di passare i data da un component all'altro passing data be. two way binding

  // creare una nuova variabile id che viene selezionato nel url
  categorieIdFromRoute: any;  //Getting category id from URL
  categorieDetail: Categorie | undefined; //Getting categorie details
  categorie: Categorie | undefined ; //Getting categorie details

  errorMsg: any;
    location: any;

  constructor(
    public categorieService: CategorieService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  //method for load category details
  getCategory(id: number): void {
    this.categorieService.viewCategorie(id).subscribe(data =>
      this.categorieDetail = data,
        error => this.errorMsg = error);   
  }

  saveCategorie(catForm: NgForm): void {
    this.categorie = catForm.value;
    console.log(this.categorie);
    //this.categorieService.addCategorie(this.categorie).subscribe(_data => {
    //   console.log(catForm.value);     // console.log('Categorie created!');
     this.router.navigateByUrl('/categories');
    //});
  }


  deleteCategorie(id: number) {
    this.route.params.subscribe(data => {
      this.categorieIdFromRoute = data.id;   // get the exixting data of the category

      console.log("categorie " + this.categorieIdFromRoute);

      this.categorieService.deleteCategorie(id).subscribe(data => {
        console.log('Catgorie with id  deleted');
        this.router.navigateByUrl('/categories');
      })
    });
  }

  

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const categorieIdFromRoute = Number(routeParams.get('id'));
    // Find the product that correspond with the id provided in route.

    this.getCategory(categorieIdFromRoute);
  
  }


  updateCategorie(form: NgForm): void {
    console.log(form);
    this.categorieService.updateCategorie(this.categorieIdFromRoute, form.value).subscribe(data => {
      console.log(data);
      //this.router.navigateByUrl('/categories');
    });  

  }

  goBack() {
    //this.location.back();
    this.router.navigate(['/categories']); 
  }

}

    //let updateCategorie = {
    //  id: form.value.id,
    //  name: form.value.name
    //};
