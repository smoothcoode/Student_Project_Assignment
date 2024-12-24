import { Component, OnInit} from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit  {
  projects:Project[]=[]
  project:Project= new Project("")

  constructor(
    private projectService:ProjectService
  ){}

  ngOnInit(): void {
    this.getAllProjects()
  }

  getAllProjects(){
    return this.projectService.getAllProject().subscribe(
      data=>{
        this.projects=data
      }
    )
  }
  addProject(){
    return this.projectService.addProject(this.project).subscribe(
      data=>{
        this.getAllProjects()
        this.project.name=""
      }
    )
  }
  deleteProject(id:any){
    return this.projectService.deleteProject(id).subscribe(
      data=>{
        this.getAllProjects()
      }
    )
  }
}
