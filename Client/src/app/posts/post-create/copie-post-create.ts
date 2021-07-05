import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  private mode = 'create';   //default
  private postId: any;     //id from route
  public post: any;
  private postsSub: Subscription | undefined;
  private posts: any;
  public isLoading: Boolean = false;

  //image store
  form: any;            //form: FormGroup | undefined;

  constructor(private postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');

        this.isLoading = true;            //loading spinner initial
        this.postsService.getPost(this.postId).subscribe((postData: any) => {
          this.isLoading = false;
          this.post = { id: postData.data._id, title: postData.data.title, content: postData.data.content };   //_id comming from the db
          this.form.setValue(
            {
              title: this.post.title,
              content: this.post.content
            });         // allow us to ovveride the value form your form control when we want to update
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });

  }

  //@Output() postCreated = new EventEmitter<Post>();    //Questo @Output () trasforma il postCreated in un evento che possiamo ascoltare dai mezzi esterni nel componente genitore.

  public onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files; //const target = event.target as HTMLInputElement; const file = target.files;
    //const target = event.target as HTMLInputElement;
    //const file = target.files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
  }

  //Creeremo un nuovo post creando un nuovo oggetto JavaScript, cioè oggetto costante utilizzando la proprietà title e content. Useremo questa parola chiave per memorizzare i dati del titolo e del contenuto 
  public onSavePost() {
    if (this.form.invalid) {
      return;
    }    //const post: Post = { id:form.value .id,title: form.value.title, content: form.value.content };
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    } else {
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
      this.isLoading = false;
    }
    this.form.reset();    //form.resetForm() pulisce la form 
  }


}  


//Avant image opload-->
/*
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  private mode = 'create';   //default
  private postId: any;     //id from route
  public post: any;
  private postsSub: Subscription | undefined;
  private posts: any;
  public isLoading: Boolean = false;

  //image store
  form: any;            //form: FormGroup | undefined;

  constructor(private postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');

        this.isLoading = true;            //loading spinner initial
        this.postsService.getPost(this.postId).subscribe((postData:any) => {
          this.isLoading = false;
          this.post = { id: postData.data._id, title: postData.data.title, content: postData.data.content };   //_id comming from the db
          this.form.setValue(
            {
             title: this.post.title,
              content: this.post.content
            });         // allow us to ovveride the value form your form control when we want to update
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });

  }

  //@Output() postCreated = new EventEmitter<Post>
  ();    //Questo @Output () trasforma il postCreated in un evento che possiamo ascoltare dai mezzi esterni nel componente genitore.

  public onImagePicked(event: Event) {
  const file = (event.target as HTMLInputElement).files; //const target = event.target as HTMLInputElement; const file = target.files;
  //const target = event.target as HTMLInputElement;
  //const file = target.files[0];
  this.form.patchValue({ image: file });
  this.form.get('image').updateValueAndValidity();
  console.log(file);
  console.log(this.form);
  }

  //Creeremo un nuovo post creando un nuovo oggetto JavaScript, cioè oggetto costante utilizzando la proprietà title e content. Useremo questa parola chiave per memorizzare i dati del titolo e del contenuto
  public onSavePost() {
  if (this.form.invalid) {
  return;
  }    //const post: Post = { id:form.value .id,title: form.value.title, content: form.value.content };
  this.isLoading = true;
  if (this.mode === 'create') {
  this.postsService.addPost(this.form.value.title, this.form.value.content);
  } else {
  this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content);
  this.isLoading = false;
  }
  this.form.reset();    //form.resetForm() pulisce la form
  }


  }

*/
