import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './list/users-list/users-list.component';
import { UsersFormComponent } from './form/users-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [UsersListComponent, UsersFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {path: '',   component: UsersListComponent },
      {path: 'create',  component: UsersFormComponent, data: { mode: 'ADD' } },
      {path: 'edit-categorie/:id',  component: UsersFormComponent, data: { mode: 'EDIT' } },
      {path: 'view-categorie/:id',  component: UsersFormComponent, data: { mode: 'DETAIL' }}
    ]) 
  ],
  exports: [],
  providers: []
})
export class UsersModule { }
