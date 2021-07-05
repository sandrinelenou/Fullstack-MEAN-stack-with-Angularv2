import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl:'./signup.component.html',
    styleUrls: ['./signup.component.css']
})


export class SignupComponent{

     public isLoading= false;

     onSignup(form:NgForm){
       console.log(form);

     }

}
