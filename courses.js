"use strict"

let courses = DATABASE.courses;

let allTeachers = DATABASE.teachers;

function courseResponsible (id) {
    let course = DATABASE.courses[id]
    let teachersNames = allTeachers.map((teacher) => teacher.firstName + " " + teacher.lastName + " " + `(${teacher.post})`);
    let res = course.courseResponsible;
    return teachersNames[res];
}

function showCourse(id) {
    let div = document.createElement("div");
    let courses = DATABASE.courses[id];
    let teachers = DATABASE.teachers;
    div.classList = "results";
    div.innerHTML =
    `<header>${courses.title} (total credits: ${courses.totalCredits})</header>
    <div>
        <div id="studentcourses">
        <h3>Course Responsible:</h3>
        <div id="teachers">
            ${teachers.teachersNames}
        </div>

        <h3>Teachers:</h3>
        <div id="teachers">
            ${courses.teachers}
        </div>
        <h3>Students:</h3>
        <div>
        
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