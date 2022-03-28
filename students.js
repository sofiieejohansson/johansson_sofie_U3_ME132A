"use strict"

// skapar en global variabel för databasen
let students = DATABASE.students;

// skapar en funktion med syftet att skapa en div med en class= container som innehåller
// studentens förnamn och efternamn samt deras totala credits
// samt en titel för infon = Courses
// och ännu en div för alla kurserna
// avslutningsvis returneras den nya diven  
function showStudent(id) {
    let div = document.createElement("div");
    let student = DATABASE.students[id]; // skapar en variabel för studenternas id i databasen för att korta ner rad 16
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

// skapar en funktion för att filtrera ut studenternas totala credits
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

// 
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
                <p>${student.courses[i].started.semester} ${student.courses[i].started.year} (${student.courses[i].passedCredits} of ${courseInfo[courses[i].courseId].totalCredits} credits)</p>
            </div>`
            courseBox.push(info);
        } else {
            let info = div.innerHTML = `
            <div class="notdone">
                <h3>${courses[i].title}</h3>
                <p>${student.courses[i].started.semester} ${student.courses[i].started.year} (${student.courses[i].passedCredits} of ${courseInfo[courses[i].courseId].totalCredits} credits)</p>
            </div>`
            
            courseBox.push(info);
        }
    }

    return courseBox.toString().split(",").join("");

}

function searchLastName() {
    return input.value.toLowerCase();
}

let input = document.getElementById("search-student");
input.addEventListener("keyup", studentLastName);

function studentLastName (){
    let studentsArray = []
    for ( let i = 0; i < students.length; i++){
        document.getElementById("students").innerHTML = ""
        if ("" == searchLastName()){
            document.getElementById("students").innerHTML = ""
        } else if (students[i].lastName.toLowerCase().includes(searchLastName())) {
            studentsArray.push(students[i]);
        } 

    }

    showStudents(studentsArray)
}

function submit () {
    let studentsArray = []
    for ( let i = 0; i < students.length; i++){
        if (students[i].lastName.toLowerCase().includes(searchLastName())) {
            studentsArray.push(students[i]);
        } 
    }

    showStudents(studentsArray)
}

input.addEventListener("submit", submit);


/*function checkDarkMode () {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode == null) {
    localStorage.setItem("darkMode", JSON.stringify(false));
 }
    var element = document.body;

    if (JSON.parse(darkMode)== true) {
        element.classList.add("darkMode")
    } else {
        element.classList.remove("darkMode");
    }
}
*/

function darkMode() {
    var element = document.body;
    const darkMode = localStorage.getItem("darkMode")
    element.classList.toggle("darkMode");

    if (JSON.parse(darkMode) == true) {
        element.classList.remove("darkMode");
        localStorage.setItem("darkMode", JSON.stringify(false));
    } 
    else if (JSON.parse(darkMode) == false) {
        element.classList.add("darkMode");
        localStorage.setItem("darkMode", JSON.stringify(true));
    }
}

const btn = document.querySelector('#light-dark');
btn.addEventListener("click", darkMode);


showStudents(DATABASE.students);

