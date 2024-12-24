import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
//import { Student } from './student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent   implements OnInit   {
  title = 'frontprojectassignment';
  /*students:Student[]=[
    new Student("patrick",5,[]),
    new Student("maxim",7,[]),
    new Student("boby",7,[]),


  ]; */

  is_prod=environment.PRODUCTION;  
  ngOnInit(): void {
    if(this.is_prod){
      console.log(" my environment is PROD ")
    }
    else{
      console.log("my environment is Dev ")
    }
  }
 
 


  }
 
  
  
  
  

