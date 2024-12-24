package com.smoothcode.projectassignment.controller;
import com.smoothcode.projectassignment.model.Project;
import com.smoothcode.projectassignment.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin(origins = "${SPRING_ORIGINS:*}")
@RequestMapping("/projects")

public class ProjectController{
    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping("/")
    public ResponseEntity<List<Project>>  getAllProjects(){
        return  ResponseEntity.ok(projectRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable int id){
        return ResponseEntity.of(projectRepository.findById(id));
    }

    @PostMapping("/")
    public ResponseEntity<Project> createProject ( @RequestBody Project projectDetails){
        Project project= projectRepository.save(projectDetails);
        return ResponseEntity.status(HttpStatus.CREATED).body(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable int id , @RequestBody Project projectDetails){
        Project project= projectRepository.findById(id).orElseThrow();
        project.setName(projectDetails.getName());
        return  ResponseEntity.ok(  projectRepository.save(project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject (@PathVariable int id ){
        Project project= projectRepository.findById(id).orElseThrow();
        projectRepository.deleteFromStudentProjectByProjectId(id);
        projectRepository.delete(project);
        return ResponseEntity.ok(" Project Deleted Successfully");

    }

}
