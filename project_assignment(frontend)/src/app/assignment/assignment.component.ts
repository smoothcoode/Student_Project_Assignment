import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrl: './assignment.component.css'
})
export class AssignmentComponent implements OnInit {
  assignmentResult:Map<String,String>= new Map()

  constructor(
    private studentService:StudentService
  ){}
  ngOnInit(): void {
    this.getAssignmentResult()
  }

  getAssignmentResult(){
    this.studentService.getStudentAssignment().subscribe(
      data=>{
        this.assignmentResult=data
      }
    )
  }

}
