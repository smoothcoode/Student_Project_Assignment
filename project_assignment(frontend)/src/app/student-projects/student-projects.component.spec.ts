import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProjectsComponent } from './student-projects.component';

describe('StudentProjectsComponent', () => {
  let component: StudentProjectsComponent;
  let fixture: ComponentFixture<StudentProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
