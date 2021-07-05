import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { VideoCenterComponent } from './videos/video-center/video-center.component';
import { VideoDetailComponent } from './videos/video-detail/video-detail.component';
import { VideoFormComponent } from './videos/video-form/video-form.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/login/signup/signup.component';


//declarare le routes
const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'dashboard', component: DashbaordComponent },
  { path: 'categories', loadChildren: () => import('./categories/categories.component').then(m => m.CategoriesModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'post-create', component: PostCreateComponent },
  { path: 'edit/:postId', component: PostCreateComponent },
  { path: 'post-list', component: PostListComponent },
  { path: 'videos', component: VideoCenterComponent },
  { path: 'video-create', component: VideoFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  //{ path: 'video-detail', component: VideoDetailComponent },
  { path: '**', component: PageNotFoundComponent }   // Wildcard route for a 404 page, in the last position
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [
  DashbaordComponent,
  PageNotFoundComponent
];
