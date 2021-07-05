import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.css']
})


export class LoginComponent{

     public isLoading= false;

     onLogin(form:NgForm){
       console.log(form);

     }

}
