"use strict"

let courses = DATABASE.courses;

function showCourse(id) {
    let div = document.createElement("div");
    let courses = DATABASE.courses[id];
    div.classList = "results";
    div.innerHTML =
    `<header>${courses.title} (total credits: ${courses.totalCredits})</header>
    <div>
        <div id="studentcourses">
        <h3>Course Responsible:</h3>
        <div id="resTeacher">
            ${findResponsible(courses)}
        </div>

        <h3>Teachers:</h3>
        <div id="teachers">
            ${findTeachers(courses)}
        </div>
        <h3>Students:</h3>
        <div id="student-box">
            ${getStudents(courses)}
        </div>
    </div>
    </div>
          `
    return div;
}

function showCourses (courses) {
    let coursesElement = document.getElementById("courses");
    for (let course of courses) {
        let courseElement = showCourse(course.courseId);
        coursesElement.appendChild(courseElement);
    }
}

function findResponsible (courses) {
    let teacherBox = []
        for (let i = 0; i < DATABASE.teachers.length; i++) {
        let div = document.createElement("div")
        if (DATABASE.teachers[i].teacherId == courses.courseResponsible) {
            let text = div.innerHTML = `
            <h2>${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} (${DATABASE.teachers[i].post})</h2>`
            teacherBox.push(text);
    
        } 
    }
    return teacherBox.toString().split(",").join(""); 
}

function findTeachers(courses) {
    let teacherBox = []
    for (let i = 0; i < DATABASE.teachers.length; i++) {
        let div = document.createElement("div");
        for (let x = 0; x < courses.teachers.length; x++) {
            if (DATABASE.teachers[i].teacherId == courses.teachers[x]) {
                let text = div.innerHTML = `
                <h4>
                ${DATABASE.teachers[i].firstName} ${DATABASE.teachers[i].lastName} 
                (${DATABASE.teachers[i].post})
                </h4>
                `
                teacherBox.push(text);
            }
        }
    }
    return teacherBox.toString().split(",").join("");
}

function getStudents(courses) {
    let studentBox = [];
    for (let i = 0; i < DATABASE.students.length; i++) {
        let div = document.createElement("div");
        for (let x = 0; x < DATABASE.students[i].courses.length; x++) {
            if (DATABASE.students[i].courses[x].courseId == courses.courseId && DATABASE.students[i].courses[x].passedCredits == courses.totalCredits) {
                let studentInfo = div.innerHTML = 
                `<div class="done">
                <h5>
                ${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName} 
                (${DATABASE.students[i].courses[x].passedCredits} credits)<br> 
                ${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}
                </h5>
                </div>`
                studentBox.push(studentInfo);
            } else if (DATABASE.students[i].courses[x].courseId == courses.courseId) {
                let studentInfo = div.innerHTML =
                `<div class="notdone">
                <h5>
                ${DATABASE.students[i].firstName} ${DATABASE.students[i].lastName} 
                (${DATABASE.students[i].courses[x].passedCredits} credits)<br> 
                ${DATABASE.students[i].courses[x].started.semester} ${DATABASE.students[i].courses[x].started.year}
                </h5>
                </div>`
                studentBox.push(studentInfo);
            }
        }
    }
    return studentBox.toString().split(",").join("");
}

function searchCourse() {
    return input.value.toLowerCase();
}

let input = document.getElementById("search-courses");
input.addEventListener("keyup", courseSearch);

function courseSearch() {
    let coursesArray = []
    for (let i = 0; i < courses.length; i++){
        document.getElementById("courses").innerHTML = ""
        if ("" == searchCourse()) {
            document.getElementById("courses").innerHTML = ""
        } else if (courses[i].title.toLowerCase().includes(searchCourse())) {
            coursesArray.push(courses[i]);
        }
    }

    showCourses(coursesArray)
}

function onLightDarkClick (event) {
    
}

function submit () {
    let coursesArray = []
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].courses.toLowerCase().includes(searchCourse)) {
            coursesArray.push(courses[i]);
        }
    }
    showCourses(coursesArray)
}

input.addEventListener("submit", submit);

showCourses(DATABASE.courses);