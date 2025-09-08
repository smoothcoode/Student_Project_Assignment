# Student Project Allocation

## Overview
The **Student Project Allocation** platform is a web application developed using **Spring Boot** for the backend and **Angular** for the frontend. The system is designed to **automatically allocate projects to students** based on their preferences and academic performance (average score). This ensures a fair and efficient distribution of projects while prioritizing students with higher academic achievements.


**Spring boot**: Java JDK 17

**Angular**: CLI: 18.2.12Node: 22.11.0 Package Manager: npm 10.9.0


## Features
- **Student Project Availability**: Students can view the projects that are available to them, ensuring they do not exceed the maximum allowed projects.


Students
![Timetable Example](https://github.com/tayeblagha/public-Images/blob/main/13.png?raw=true)


Students` Projects
![Timetable Example](https://github.com/tayeblagha/public-Images/blob/main/14.png?raw=true)


Projects
![Timetable Example](https://github.com/tayeblagha/public-Images/blob/main/14.png?raw=true)



- **Automatic Project Assignment**: The system assigns projects to students based on their **average** and selected preferences.
![Timetable Example](https://github.com/tayeblagha/public-Images/blob/main/15.png?raw=true)
- **Data Persistence**: Uses **Spring Boot JPA** with **MySQL** to manage students, projects, and assignments.
- **RESTful API**: Provides endpoints for retrieving available projects and performing project assignments.
- **Angular Frontend**: A user-friendly interface for students and administrators to interact with the system.

## Core Functionalities
### 1. Retrieving Available Projects for a Student
- The system ensures students do not exceed the maximum allowed projects.
- It filters out projects the student has already been assigned.
- **Time Complexity**: **O(N)**, where **N** is the total number of projects.
- **Space Complexity**: **O(N)** (storing project IDs in a HashSet for quick lookup).

### 2. Automatic Project Assignment
- Students are **sorted in descending order based on their academic average**.
- The algorithm iterates through each student and assigns them the highest-priority available project.
- **Time Complexity**: **O(M log M + M * P)**, where **M** is the number of students and **P** is the number of projects (sorting takes **O(M log M)**, and assigning takes **O(M * P)** in the worst case).
- **Space Complexity**: **O(M + P)** (storing student-project mappings and available project IDs in a HashSet).

## Conclusion
The **Student Project Allocation** system automates the process of assigning projects to students efficiently. By considering student preferences and academic performance, it ensures fairness and optimal allocation. Future enhancements could include **machine learning-based recommendations** and **real-time allocation adjustments** to further optimize project distribution.

