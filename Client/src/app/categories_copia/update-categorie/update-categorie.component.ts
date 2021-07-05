import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../../models/categorie';
import { CategorieService } from '../../services/categorie.service';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.css']
})
export class UpdateCategorieComponent implements OnInit {

  categorieIdFromRoute: any;
  categorieDetails: Categorie | undefined;

  @Input() name: string | undefined;
  

  constructor(
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router : Router
  ) { }


  ngOnInit(): void {
   // this.updateCategorie(this.categorieIdFromRoute);

    this.route.params.subscribe(data => {
      this.categorieIdFromRoute = data.id;   // get the existing data of the category

      this.categorieService.viewCategorie(this.categorieIdFromRoute).subscribe(categoriedata => {
        this.categorieDetails = categoriedata;
        console.log(categoriedata);     // console.log('Categorie created!');
       
      });
    });

  }


  updateCategorie(form: NgForm): void {

    console.log(form);
    //let updateCategorie = {
    //  id: form.value.id,
    //  name: form.value.name
    //};
    this.categorieService.updateCategorie(this.categorieIdFromRoute, form.value).subscribe(data => {
      //console.log(data);
      this.router.navigateByUrl('/categories');
    });
     console.log('Categorie created!');
     //this.router.navigateByUrl('/categories');


  }


  goBack() {
    //this.location.back();
    this.router.navigate(['/categories']);
  }
  //updateCategorie(id: number) {
  // // this.categorieService.update(id, categorie).subscribe();
  //  console.log('Catgorie with id  updated');
  //}


}






//updateCategorie(catUpdateForm: NgForm): void {

//  this.route.params.subscribe(data => {
//    this.categorieIdFromRoute = data.id;   // get the exixting data of the category

//    console.log(catUpdateForm.value);

//    let updateCategorie = {
//      id: catUpdateForm.value.id,
//      name: catUpdateForm.value.name
//    };

//    console.log(updateCategorie);

//    //this.categoryNew = catForm.value;
//    //console.log(this.categoryNew);
//    this.categorieService.viewCategorie(this.categorieIdFromRoute).subscribe(data => {
//      this.categorieUpdate = data;
//      console.log(data);     // console.log('Categorie created!');
//      // this.router.navigateByUrl('/categories');
//    });
//  });
//}
