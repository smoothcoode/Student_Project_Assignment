import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { Project } from '../project';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-student-projects',
  templateUrl: './student-projects.component.html',
  styleUrl: './student-projects.component.css'
})
export class StudentProjectsComponent implements OnInit  {
  student:Student=new Student("",0,[])
  availableProjects:Project[]=[]
  projectId:any 

  constructor(
    private studentService:StudentService,
    private activatedRoute:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.student.id=this.activatedRoute.snapshot.params["id"]
    this.refreshPage()
  }
  getStudentById(){
    this.studentService.getStudentById(Number(this.student.id)).subscribe(
      data=>{
        this.student=data
      }
    )
  }
  GetStudentAvailableProject(){
    this.studentService.getAvailableStudentProjects(this.student.id).subscribe(
      data=>{
        this.availableProjects=data
      }
    )
  }

  refreshPage(){
    this.getStudentById()
    this.GetStudentAvailableProject()
  }

  addProject(){
    this.studentService.addProjectToStudent(this.student.id,this.projectId).subscribe(
      data=>{
        this.refreshPage()
      }
    )
  }

  deleteProject(project_id:any){
    this.studentService.deleteProjectFromStudent(this.student.id,project_id).subscribe(
      data=>{
        this.refreshPage()
      }
    )
  }



  
  }












