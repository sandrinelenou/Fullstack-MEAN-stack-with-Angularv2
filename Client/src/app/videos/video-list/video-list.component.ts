import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  inputs:['videos']    //for match input property
})
            
export class VideoListComponent implements OnInit {

  @Input() videos: any    // share data from parent(video-center) to child,decorate the property with @Input()
  @Output() SelectedVideo = new EventEmitter();   //share data from child to parent, event type <Video>

 // public videos: Video[] = [];
  
  constructor() { } 
  
  ngOnInit(): void {
  }

  public onSelect(vid: Video) {
    this.SelectedVideo.emit(vid);
  }
}






//Video Center => input => VideoList => Display list
//Video List => output => videoCenter => Capture Selected Video
//Video Center => input => Video detail => Display Details
