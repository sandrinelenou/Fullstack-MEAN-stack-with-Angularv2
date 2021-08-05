import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoriesListComponent } from './list/categories-list.component';
import { CategoriesDataFormComponent } from './form/categories-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '',  component: CategoriesListComponent  },
      { path: 'create', component: CategoriesDataFormComponent, data: { mode: 'ADD'}     },
      { path: 'edit-categorie/:id',component: CategoriesDataFormComponent, data: { mode: 'EDIT' }  },
      { path: 'view-categorie/:id',component: CategoriesDataFormComponent, data: { mode: 'VIEW' }  }
    ])
  ],
  providers: [  ],
  declarations: [
    CategoriesListComponent,
     CategoriesDataFormComponent
  ],
  exports: [  ]
})
export class CategoriesModule { }
