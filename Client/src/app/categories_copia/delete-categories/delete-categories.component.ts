import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../../services/categorie.service';

@Component({
  selector: 'app-delete-categories',
  templateUrl: './delete-categories.component.html',
  styleUrls: ['./delete-categories.component.css']
})
export class DeleteCategoriesComponent implements OnInit {
  categoryIdFromRoute: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router ,
    private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.categoryIdFromRoute = data.id;

      this.categorieService.deleteCategorie(this.categoryIdFromRoute).subscribe(data => {
        console.log('Deleted categorie');
        this.router.navigateByUrl('/categories');
      });
    });
  }

}
