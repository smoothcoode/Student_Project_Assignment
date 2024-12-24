import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Student } from './student';
import { Observable } from 'rxjs';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  link=environment.BASE_HOST+"/students/"
  constructor(private httpClient:HttpClient) { }

  getAllStudent():Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.link)
  }
  getStudentById(id:Number):Observable<Student>{
    return this.httpClient.get<Student>(this.link+id)
  }
  addStudent(student:Student):Observable<Student>{
    return  this.httpClient.post<Student>(this.link,student)
  }
  updateStudent(id:Number,student:Student){
    return this.httpClient.put<Student>(this.link+id,student)
  }
  deleteStudent(id:Number):Observable<String>{
    return this.httpClient.delete(this.link+id,{responseType:"text"})
  } 
  getAvailableStudentProjects(student_id:any):Observable<Project[]>{
    return this.httpClient.get<Project[]>(this.link+student_id+"/availableprojects")
  }
  addProjectToStudent(student_id:any,project_id:any):Observable<Student>{
    return this.httpClient.post<Student>(this.link+student_id+"/projects/"+project_id,"")
  }
  deleteProjectFromStudent(student_id:any,project_id:any):Observable<Student>{
    return this.httpClient.delete<Student>( this.link+student_id+"/projects/"+project_id)
  }
  getMaxProjectsPerStudent():Observable<Number>{
    return this.httpClient.get<Number>( this.link+"max_project")
  }
  updateMaxProjectsPerStudent(val:any):Observable<Number>{
    return this.httpClient.put<Number>(this.link+"max_project",val)
  }
  getStudentAssignment():Observable<Map<String,String>> {
      return this.httpClient.get<Map<String,String>>(this.link+"assignment")
  }




}
