"use strict"

let courses = DATABASE.courses;

function showCourse(id) {
    let div = document.createElement("div");
    let course = DATABASE.courses[id];
    div.classList = "container";
    div.innerHTML = `
    <header>${courses.title} (${courses.totalCredits})</header>
    <div>
        <div id="course">
            <h4>Course Responsible:</h4>
            <div id="teachers">
                ${courses.courseRespinsible}
            </div>
            <h4>Teachers:</h4>
            <div id="teachers">
                ${courses.teachers}
            </div>
            <h4>Students:</h4>
            <div>
            
            </div>
        </div>
    </div>`

    return div;
}

function showCourses(courses) {
    let coursesElement = document.getElementById("courses");
    for (let course of courses) {
        let courseElement = showcourse(course.courseID)
        coursesElement.appendChild(courseElement)
    }
}



