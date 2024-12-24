import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent implements OnInit {
  student:Student=new Student("",0,[])
  isOutOfRange=false
  id:any
  constructor(
    private studentService:StudentService,
    private router:Router,
    private activeRoute:ActivatedRoute,
  ){     }

  ngOnInit(): void {
    this.id=this.activeRoute.snapshot.params["id"]
    if (this.id){
      this.studentService.getStudentById(this.id).subscribe(
        data=>{
          this.student=data;
        }
      )
    }
  }

  upsert(){
    const average=Number(this.student.average)
    if(average<0 || average>10){
      this.isOutOfRange=true 
      return
    }
    const observer={
      next:(data:Student)=>{ this.router.navigate(["/students"])},
      error:(error:any)=>{ console.log(error)},
      complete:()=>{ console.log("operation completed")}
    }
    if (this.id){
      this.studentService.updateStudent(this.id,this.student).subscribe(observer)
    }
    else{
      this.studentService.addStudent(this.student).subscribe(observer)

    }
    

  }

}
