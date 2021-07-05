import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
  outputs : ['updateVideoEvent', 'deleteVideoEvent']                               // call the event update event
})
export class VideoDetailComponent implements OnInit {

  @Input() video: any;
  public editTitle: Boolean = false;
  public editUrl: Boolean = false;
  public editDescription: Boolean = false;
  private updateVideoEvent = new EventEmitter();
  private deleteVideoEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public ngOnchanges() {
    var context = this;
    context.editTitle = false;
  }

  public onTitleClick() {
    var context = this;
    context.editTitle = true;
  }

  public onUrlClick() {
    var context = this;
    context.editUrl = true;
  }

  public onDescriptionClick() {
    var context = this;
    context.editDescription = true;
  }

  public updateVideo() {
    var context = this;
    this.updateVideoEvent.emit(this.video);

  }

  public deleteVideo() {
    var context = this;
    this.deleteVideoEvent.emit(this.video);
  }
}
