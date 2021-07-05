import { Component, Input, OnInit } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';  //fundamentale per le form
import { Router } from '@angular/router';
import { Categorie } from '../../models/categorie';
import { CategorieService } from '../../services/categorie.service';

@Component({
  selector: 'app-create-categorie',
  templateUrl: './create-categorie.component.html',
  styleUrls: ['./create-categorie.component.css']
})

export class CreateCategorieComponent implements OnInit {

  categoryNew: Categorie | any;  
   
  @Input() name: string | undefined;
    catForm: any;

  constructor(
    private categorieService: CategorieService,
    private router: Router   
  ) { }

  ngOnInit(): void {  
  }

  goBack() {
    this.router.navigate(['/categories']);
  }

  // prodFormarray di tutte le proprieta di ngForm invece prodForm.value stampa solo il name inserito in input
  addNewCategorie(catForm: NgForm): void {

    console.log(catForm.value);

    let newCategorie = {
      id: catForm.value.id,
      name: catForm.value.name
    };
    console.log(newCategorie);

    //this.categoryNew = catForm.value;
 
    this.categorieService.createCategorie(newCategorie).subscribe(data => {
      console.log(data);     // console.log('Categorie created!');
       this.router.navigateByUrl('/categories');
    });
  }



// catForm array di tutte le proprieta di ngForm invece catForm.value stampa solo il name inserito in input
  //addNewCategorie(catForm: NgForm): void  {

  //  this.categoryNew = catForm.value;
  //  console.log(this.categoryNew);
  //  this.categorieService.createCategorie( this.categoryNew ).subscribe(data => {
  //   // console.log(catForm.value);     // console.log('Categorie created!');
  //    this.router.navigateByUrl('/categories');
  //  });
  //}

}
