import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { environment } from '../environments/environment';
import { Project } from './project';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  link=environment.BASE_HOST+"/projects/"
  constructor(private httpClient:HttpClient) { }

  getAllProject():Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.link)
  }
  getProjectById(id:Number):Observable<Project>{
    return this.httpClient.get<Project>(this.link+id)
  }
  addProject(Project:Project):Observable<Project>{
    return  this.httpClient.post<Project>(this.link,Project)
  }
  updateProject(id:Number,Project:Project){
    return this.httpClient.put<Project>(this.link+id,Project)
  }
  deleteProject(id:Number):Observable<String>{
    return this.httpClient.delete(this.link+id,{responseType:"text"})
  }
}
