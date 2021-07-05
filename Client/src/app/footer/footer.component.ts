import { Component, OnInit } from '@angular/core';
//import { formatDate } from "@angular/common";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  today: number = Date.now();

  constructor() { }

  ngOnInit(): void {
    
  }

}
