import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { map } from 'rxjs/operators';     //The map() method allows us to transform every element of an array into a new element and store them all back into a new array.
import { Router } from '@angular/router';

@Injectable({providedIn:'root' })
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  //endpoind api
  private apiUrl: string = 'http://localhost:3000/api/post/list';

  constructor(private http: HttpClient, private router: Router) { }

  //The pipe() function allows us to add in such an operator.
  //The map() method allows us to transform every element of an array into a new element and store them all back into a new array.
  public getPosts() {
    this.http.get<{ message: string, posts: any }>(this.apiUrl)
      .pipe(map((postData) => {
        return postData.posts.map((post: { title: any; content: any; _id: any; }) => {    //We already stripped out the message, but we also need to convert every post, and we will do this with the normal javascript method. This map() method can be added to any array
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        });
      }))
      .subscribe((transformedPost) => {
        this.posts = transformedPost;
        this.postsUpdated.next([...this.posts]);   // We also need to update our subscribe code. We just replaced the postData with transformedPost and assigned it to the this.postsa che cosa serve questa ? per fare andare avanti il progetto? come next()?
      });

  }

  public getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>("http://localhost:3000/api/post/" + id);

  }

  public addPost(title: string, content: string) {
    const post: Post = { id: '',  title: title, content: content  };
    this.http.post<{ message: string, postId:string }>('http://localhost:3000/api/post/create', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);        // store the post,Aggiorna nel frontend altrimenti salva nel db ma non si visualizza nel frontend
        this.postsUpdated.next([...this.posts]); // Update post in our frontend application
        this.router.navigate(['/post-list']);
      });
  }


  public updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http.put("http://localhost:3000/api/post/update/" + id, post)
      .subscribe( response => {
      //const updatedPosts = [...this.posts];       //create the clone of post,ma abbiamo ancora bisogno di sapere come possiamo aggiornare localmente il post dopo aver ottenuto la risposta positiva
      //const oldPostIndex = updatedPosts.findIndex(post=> post.id === post.id);   // cercheremo quella vecchia versione del post in base al suo ID, quindi cercheremo l'indice , Il metodo findIndex () accetta una funzione che restituirà true se troviamo i post che stiamo cercando. Quindi, in questa funzione, controlleremo se il post o l'ID del post che stiamo cercando in quell'array è uguale a post.id oppure no. Se è uguale, troviamo l'indice del post che vogliamo sostituire
      //updatedPosts[oldPostIndex] = post;    // sostituiremo il post di quell'indice con il nostro nuovo post
      //this.posts = updatedPosts;              //Ora, dobbiamo memorizzare i valori dell'array updatedPosts nell'array di post originale
      //this.postsUpdated.next([...this.posts]);     //Ora, dobbiamo anche comunicare alla nostra app questo aggiornamento alla nostra app
      //console.log(response);
        this.router.navigate(['/post-list']);
    });
  }

  public deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/post/delete/" + postId).subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId); //For live updating,  La funzione filter () ci permette di restituire solo un sottoinsieme di quell'array di post. Passeremo la funzione come argomento alla funzione di filtro. Questa funzione verrà eseguita per ogni post nell'array. Se restituisce true, l'elemento post verrà mantenuto, ma se restituisce false, l'elemento non farà parte del nuovo array di post filtrato che abbiamo memorizzato nei post aggiornati.
      this.posts = updatedPosts;   //Ora, la nostra interfaccia utente frontend verrà aggiornata quando elimineremo un post
      this.postsUpdated.next([...this.posts]);   //send the copy of post, Ora, dobbiamo anche comunicare alla nostra app questo aggiornamento alla nostra app
      console.log("Post Deleted")
    });
  }

  //????
  public getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }



}
