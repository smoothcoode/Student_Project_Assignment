import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {
  constructor(private studentService:StudentService){}
  students:Student[]=[]
  maxProjectsPerStudent:any 
  tempNumber:any
  ngOnInit(): void {
    this.getAllStudent()
    this.getMaxProjectPerStudent()
  }
  getAllStudent(){
    this.studentService.getAllStudent().subscribe(
      data=>{
        this.students=data
      }
    )
  }
  deleteStudent(id:any){
    this.studentService.deleteStudent(id).subscribe(
      data=>{
        this.getAllStudent()
      }
    )
  }
  getMaxProjectPerStudent(){
    this.studentService.getMaxProjectsPerStudent().subscribe(
      data=>{
        this.maxProjectsPerStudent=data
      }
    )
  }
  updateMaxProjectsPerStudent(){
    this.studentService.updateMaxProjectsPerStudent(this.tempNumber).subscribe(
      data=>{
        this.maxProjectsPerStudent=data
      }
    )
  }

}
