import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { ProductService } from './services/product.service';
import { CategorieService } from './services/categorie.service';
import { PostsService } from './posts/posts.service';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

import { VideoListComponent } from './videos/video-list/video-list.component';
import { VideoFormComponent } from './videos/video-form/video-form.component';
import { VideoDetailComponent } from './videos/video-detail/video-detail.component';
import { VideoCenterComponent } from './videos/video-center/video-center.component';
import { LoginComponent } from './authentication/login/login.component';
import { SafePipe } from './safe.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SignupComponent } from './authentication/login/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashbaordComponent,
    PageNotFoundComponent,
    PostCreateComponent,
    PostListComponent,
    VideoListComponent,
    VideoFormComponent,
    VideoDetailComponent,
    VideoCenterComponent,
    LoginComponent,
    SignupComponent,
    SafePipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatMenuModule,
    MatTableModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ProductService, CategorieService,PostsService], //fornire i servizi(provide)
  bootstrap: [AppComponent]
})
export class AppModule { }
