package com.smoothcode.projectassignment.repository;
import com.smoothcode.projectassignment.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Integer> {
    @Modifying
    @Transactional
@Query(value = "DELETE FROM STUDENT_PROJECT WHERE PROJECT_ID=?1",nativeQuery = true)
    public void deleteFromStudentProjectByProjectId(Integer project_id);
}

