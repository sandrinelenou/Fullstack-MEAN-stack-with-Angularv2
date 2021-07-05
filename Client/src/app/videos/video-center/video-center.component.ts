import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

  public selectedVideo: any;   // with type Video give me error
  public videos: any;
  public hidenewVideo: Boolean = true;

  constructor(private _videoService: VideoService) { }

  ngOnInit(): void {
    var context = this;
    context._videoService.getVideos().subscribe(resVideoData => context.videos = resVideoData);
  }

  public onSelectVideo(video: Video) {
    var context = this;
    context.selectedVideo = video;
    context.hidenewVideo = true;
    //console.log(context.selectedVideo);
  }

  public onSubmitAddVideo(video: Video) {
    var context = this;
    this._videoService.addVideo(video).subscribe(resNewVideo => {
      context.videos.push(resNewVideo);
      context.hidenewVideo = true;
      context.selectedVideo = resNewVideo;   // per fare apparire il datail video
    });
  }
  public newVideo() {
    var context = this;
    context.hidenewVideo = false;
  }

  public onUpdateVideoEvent(video : any) {
    this._videoService.updateVideo(video).subscribe(resUpdatedVideo => video = resUpdatedVideo);
    this.selectedVideo = null;    // per pulire la form
  }

  public onDeleteVideoEvent(video: any) {
    let videoArray = this.videos;
    this._videoService.deleteVideo(video).subscribe(resDeleteVideo => {
      for (let i = 0; i < videoArray.length; i++) {
        if (videoArray[i]._id == video._id) {
          videoArray.splice(i,1);
        }
      }
    });
    this.selectedVideo = null;    // per pulire la form
  }


}





//Video Center => input => VideoList => Display list
//Video List => output => videoCenter => Capture Selected Video
//Video Center => input => Video detail => Display Details
