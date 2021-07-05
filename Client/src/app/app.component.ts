import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  public title = 'My Ecommerce';
  public storedPosts: Post[] = [];   //new name of posts in list
  public posts: Post[]=[];
  

  public onPostAdded(post:Post) {
    this.storedPosts.push(post);
  }
  
  constructor() { }

  ngOnInit(): void {
   // this.productService.getProducts().then(products => this.products = products);
  }

}
