import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentProjectsComponent } from './student-projects/student-projects.component';
import { AssignmentComponent } from './assignment/assignment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectListComponent,
    StudentListComponent,
    StudentFormComponent,
    StudentProjectsComponent,
    AssignmentComponent,


  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
