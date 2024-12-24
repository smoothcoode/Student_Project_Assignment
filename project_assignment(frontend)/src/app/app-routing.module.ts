import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { StudentProjectsComponent } from './student-projects/student-projects.component';

const routes: Routes = [
  {path:"students",component:StudentListComponent},
  {path:"students/addstudent",component:StudentFormComponent},
  {path:"students/updatestudent/:id",component:StudentFormComponent},
  {path:"students/:id/projects",component:StudentProjectsComponent},
  {path:"projects",component:ProjectListComponent},
  {path:"assignment",component:AssignmentComponent},
  {path:"",redirectTo:"students",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
