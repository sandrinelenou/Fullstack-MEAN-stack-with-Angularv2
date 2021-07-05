import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css']
})

export class VideoFormComponent implements OnInit {

  title = new FormControl('', Validators.required);
  getErrorMessage() {
    if (this.title.hasError('required')) {
      return 'You must enter a value';
    }

    return this.title.hasError('title') ? 'Not a valid title' : '';
  }

  costructor() { }

  ngOnInit() { }
}
