"use strict"

let courses = DATABASE.courses;

function showCourse() {
    let div = document.createElement("div");
    let course = DATABASE.courses
    div.classList = "container"
    div.innerHTML = `
    <header></header>
    <div>
        <div id="">
            <h4></h4>
            <div id="">
            
            </div>
        </div>
    </div>`

    return div;
}