package com.smoothcode.projectassignment.controller;


import com.smoothcode.projectassignment.model.Project;
import com.smoothcode.projectassignment.model.Student;
import com.smoothcode.projectassignment.repository.ProjectRepository;
import com.smoothcode.projectassignment.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ExpressionException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "${SPRING_ORIGINS:*}")
@RequestMapping("/students")
public  class StudentController {
    private static  int maxProjectsPerStudent=3;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/")
    public ResponseEntity<List<Student>> getAllStudent(){
        List<Student> allStudents= studentRepository.findAll();

        return ResponseEntity.ok(studentRepository.findAll());
    }
    public Student retieveStudentById(int id){
        return  studentRepository.findById(id).orElseThrow(
                ()-> new ExpressionException("Student with id "+id+" is not Found !")
        );
    }
    public Project retieveProjectById(int id){
        return  projectRepository.findById(id).orElseThrow(
                ()-> new ExpressionException("Project with id "+id+" is not Found !")
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudetById(@PathVariable int id){
        return ResponseEntity.of(studentRepository.findById(id));
    }
    @PostMapping("/")
    public ResponseEntity<Student> createStudent(@RequestBody Student studentDetails){
        Student savedStudent= studentRepository.save(studentDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);

    }
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent( @PathVariable int id , @RequestBody Student studentDetails){
        Student student= retieveStudentById(id);
        student.setName(studentDetails.getName());
        student.setAverage(studentDetails.getAverage());
        return  ResponseEntity.ok(studentRepository.save(student));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id ) {
        Student student = retieveStudentById(id);
        studentRepository.delete(student);
        return ResponseEntity.ok("Student deleted Successfully");

    }
    @GetMapping("/max_project")
    public ResponseEntity<Integer> getMaxProjectPerStudent(){
        return ResponseEntity.ok(maxProjectsPerStudent);
    }
    @PutMapping("/max_project")
    public ResponseEntity<Integer> updateMaxProjectPerStudent(@RequestBody int maximumNumber){
        maxProjectsPerStudent=maximumNumber;
        return  ResponseEntity.ok(maximumNumber);
    }

    @PostMapping("/{student_id}/projects/{project_id}")
    public ResponseEntity<Student> addProjectToStudent(@PathVariable int student_id , @PathVariable int project_id  ){
        Student student= retieveStudentById(student_id);
        Project project= retieveProjectById(project_id);
        for (Project p :student.getProjects()){
            if(p.getId() == project.getId()){
                return ResponseEntity.status(400).body(student);
            }
        }
        if (student.getProjects().size()>=maxProjectsPerStudent){
            return ResponseEntity.badRequest().body(student);

        }
        student.getProjects().add(project);
        return  ResponseEntity.status(HttpStatus.CREATED).body(studentRepository.save(student));
    }

    @DeleteMapping("/{student_id}/projects/{project_id}")
    public ResponseEntity<Student> deleteProjectFromStudent(@PathVariable int student_id , @PathVariable int project_id  ){
        Student student= retieveStudentById(student_id);
        Project project= retieveProjectById(project_id);
        student.getProjects().remove(project);
        return  ResponseEntity.ok(studentRepository.save(student));
    }

    @GetMapping("{student_id}/availableprojects")
    public ResponseEntity<List<Project>>  getStudentAvailbleProjects(@PathVariable int student_id ){
        Student student = retieveStudentById(student_id);
        List<Project > availbleProjects = new ArrayList<Project>();
        if (student.getProjects().size()>=maxProjectsPerStudent){
            return  ResponseEntity.ok(availbleProjects);
        }
        List<Project>   allProjects=  projectRepository.findAll();
        HashSet<Integer> projectIds= new HashSet<>();
        for (Project p : student.getProjects()){
            projectIds.add(p.getId());
        }
        for (Project pro: allProjects){
            if (!  projectIds.contains(pro.getId())){
                availbleProjects.add(pro);
            }
        }
        return   ResponseEntity.ok(availbleProjects);

    }

    @GetMapping("/assignment")
    public ResponseEntity<HashMap<String,String>> assignProjectToStudent(){
        HashMap<String,String> assignList= new HashMap<String,String>();
        HashSet<Integer> projectIds = projectRepository.findAll()
                .stream()
                .map( Project::getId)
                .collect(Collectors.toCollection(HashSet::new));
        List<Student> listStudent= studentRepository.findAll();
        listStudent.sort(  (Student s1,Student s2)->  Double.compare(s2.getAverage(), s1.getAverage()) );
        for (Student s:listStudent){
            for (Project p:s.getProjects()){
                if(projectIds.contains(p.getId())){
                    assignList.put(s.getName(),p.getName());
                    projectIds.remove(p.getId());
                    break;

                }
            }
        }
        return ResponseEntity.ok(assignList);
    }
}
