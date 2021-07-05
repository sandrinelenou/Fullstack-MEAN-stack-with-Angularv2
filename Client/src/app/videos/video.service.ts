import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Video } from './video';

@Injectable()

export class VideoService {

 // private api = 'http://localhost:3000';
  private _getUrl = 'http://localhost:3000/api/video/list';
  private _postUrl = 'http://localhost:3000/api/video/create';
  private _putUrl = 'http://localhost:3000/api/video/update/';
  private _deleteUrl = 'http://localhost:3000/api/video/delete/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  //private _getUrl = '/api/video/list';
  constructor(private _http: HttpClient) { }

  public getVideos() {
    var context = this;
    return context._http.get(context._getUrl).map((response: any) => {                               // return context._http.get(context._getUrl).map((response:any) => { return response.items});
      if (response.code == 0) {
        return response.items;
      } else {
        console.log(response.message);
      }
    });

  }

  public addVideo(video: Video) {
    var context = this;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: Headers });
    return context._http.post(context._postUrl, JSON.stringify(video), context.httpOptions)
      .map((response: any) => response.items );
  }

  public updateVideo(video: Video) {
    var context = this;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: Headers });
    return context._http.put(context._putUrl + video._id, JSON.stringify(video), context.httpOptions)
      .map((response: any) => response.items);
  }

  public deleteVideo(video: Video) {
    var context = this;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: Headers });
    return context._http.delete(context._deleteUrl + video._id)
      .map((response: any) => response.items);
  }




}



//public getVideos() {
//  var context = this;
//  return context._http.get(context._getUrl).map((response: any) => {

//    if (response.code == 0) {
//      return response.items;
//    } else {
//      console.log(response.message);
//    }
//  });

//}
//public getVideos() {
//  var context = this;
//  return context._http.get(context._getUrl).map((response: any) => response.json());

//}
