import { NgModule } from '@angular/core';

import { ProductsListComponent } from './list/products-list.component';
import { ProductsFormComponent } from './form/products-form.component';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ProductsListComponent },
      { path: 'create', component: ProductsFormComponent, data: { param: 'ADD' } },
      { path: 'edit-product/:id', component: ProductsFormComponent, data: { mode: 'EDIT' } },
      { path: 'view-product/:id', component: ProductsFormComponent, data: { mode: 'VIEW' } }
    ])
  ],
  providers: [
  ],
  exports: [
  ]
})
export class ProductsModule { }
