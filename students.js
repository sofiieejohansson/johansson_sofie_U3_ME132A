"use strict"

let students = DATABASE.students;

function showStudent(id) {
    let div = document.createElement("div");
    let student = DATABASE.students[id];
    div.classList = "container";
    div.innerHTML = `
    <header>${student.firstName} ${student.lastName} (Total Credits: ${sumCredits(student)})</header>
    <div>
        <div id="course">
            <h4>Courses: </h4>
            <div id="courses">
                ${showCourses(student)}
            </div>
        </div>
    </div>`

    return div;
}

function sumCredits(student) {
    let credits = [];
    for (let course of student.courses){
        credits.push(course.passedCredits);
    }

    let creditSum = 0;
    for (let i = 0; i < credits.length; i++){
        creditSum += credits[i];
    }

    return creditSum;
}

function showStudents(students){
    let studentsElement = document.getElementById("students");
    for (let student of students){
        let studentElement = showStudent(student.studentID);
        studentsElement.appendChild(studentElement);
    }
}

function showCourses(student){
    let courseInfo = DATABASE.courses;
    let courses = [];
    for (let i = 0; i < student.courses.length; i++){
        let id = student.courses[i].courseId;
        courses.push(courseInfo[id]);
    }

    let courseBox = [];
    for ( let i = 0; i < courses.length; i++){
        let div = document.createElement("div");

        if (student.courses[i].passedCredits == courseInfo[courses[i].courseId].totalCredits){
            let info = div.innerHTML = `
            <div class="done">
                <h3>${courses[i].title}</h3>
                <p>(${student.courses[i].passedCredits} of ${courseInfo[courses[i].courseId].totalCredits} credits)</p>
            </div>`
            courseBox.push(info);
        } else {
            let info = div.innerHTML = `
            <div class="notdone">
                <h3>${courses[i].title}</h3>
                <p>(${student.courses[i].passedCredits} of ${courseInfo[courses[i].courseId].totalCredits} credits)</p>
            </div>`
            
            courseBox.push(info);
        }
    }

    return courseBox.toString().split(",").join("");

}

showStudents(DATABASE.students);
