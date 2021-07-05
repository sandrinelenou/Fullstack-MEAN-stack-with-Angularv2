import { Component, Input, OnDestroy, OnInit} from "@angular/core";
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(private postsService: PostsService) { }

   posts: Post[] = [];   //per recuperare i dati inseriti dall'input
  private postsSub: Subscription | undefined;
  public isLoading: Boolean = false;
  totalPosts = 10;              //The length of the total number of items that are being paginated. Defaulted to 0.
  postsPerPage = 2;               //pageSize,Number of items to display on a page
  pageSizeOptions = [1, 2, 5, 10];              //The set of provided page size options to display to the user



  ngOnInit(): void{
    this.postsService.getPosts();
    this.isLoading = true;
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
  }


  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }


  ngOnDestroy() {
    this.postsSub?.unsubscribe();   //update array on the frontend after deleted
  }



}
