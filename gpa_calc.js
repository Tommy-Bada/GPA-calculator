// Neccesary Numbers
let totalUnits = 0
let totalPoints = 0

// Course Details and Functions on submit
class CourseDetails{
    constructor(title, unit, score, point, grade){
        this.title = title;
        this.unit = unit;
        this.score = score;
        this.point = point;
        this.grade = grade;
    }

    addDetailstoTable(){
        let details = document.createElement("tr")
        details.innerHTML = `
         <td>${this.title}</td>
         <td>${this.unit}</td>
         <td>${this.score}</td>
         <td>${this.point}</td>
         <td>${this.grade}</td>
         <td class="cancel"><img class="cancel-icon" src="images/close.svg" alt="cancel" /></td>`
     document.querySelector("table").appendChild(details)
     }

     clearInput(){
         document.querySelector("#course-title").value = ""
         document.querySelector("#course-unit").value = ""
         document.querySelector("#course-score").value = ""
     }

     sumUpUnits(){
         totalUnits += this.unit
     }

     sumUpPoints(){
         totalPoints += this.point
     }
}

//Working with Local storage
class LocalStorage{
   storeInLS(courseDetails){
        let courseInfo;
        if(localStorage.getItem('courseInfo') === null){
            courseInfo = []
        }
        else{
            courseInfo = JSON.parse(localStorage.getItem('courseInfo'))
        }
        courseInfo.push(courseDetails)
        localStorage.setItem("courseInfo", JSON.stringify(courseInfo))
    }

    removeInLS(rmvCourseDetails){
        let courseInfo;
        if(localStorage.getItem('courseInfo') === null){
            courseInfo = []
        }
        else{
            courseInfo = JSON.parse(localStorage.getItem('courseInfo'))
        }

        courseInfo.forEach(function(obj, index){
            if(obj.title === rmvCourseDetails.firstElementChild.textContent){
                courseInfo.splice(index, 1)
            }
        });

        localStorage.setItem("courseInfo", JSON.stringify(courseInfo))
    }
}

// Input Events
document.querySelector("#course-unit").addEventListener("blur", function(e){
    if(Number(e.target.value) > 6 || Number(e.target.value) < 1 ){
        alert("your course unit is out of range");
        e.target.value = "";
    }
    e.preventDefault()
})
document.querySelector("#course-score").addEventListener("blur", function(e){
    if(Number(e.target.value) > 100 || Number(e.target.value) < 0 ){
        alert("your score is out of range");
        e.target.value = "";
    }
    e.preventDefault()
})

//Submit Event
document.querySelector("form").addEventListener("submit", function(e){
 let title = document.querySelector("#course-title").value;
 let unit = Number(document.querySelector("#course-unit").value);
 let score = Number(document.querySelector("#course-score").value);
 let point;
 let grade;

   if( title === "" || document.querySelector("#course-unit").value === "" || document.querySelector("#course-score").value === ""){
        alert("Please complete your input");
   }else{

        if(score >= 0 && score < 45){
            point = 0*unit;
            grade = "F"
        }
        if(score >= 45 && score < 50){
            point = 1*unit;
            grade = "D"
        }
        if(score >= 50 && score < 60){
            point = 2*unit;
            grade = "C"
        }
        if(score >= 60 && score < 70){
            point = 3*unit;
            grade = "B"
        }
        if(score >= 70 && score <= 100){
            point = 4*unit;
            grade = "A"
        }

        courseDetails = new CourseDetails(title, unit, score, point, grade)
        regLocalStorage = new LocalStorage()
        
        courseDetails.addDetailstoTable()
        courseDetails.clearInput()
        courseDetails.sumUpUnits()
        courseDetails.sumUpPoints()
        regLocalStorage.storeInLS(courseDetails)
    
   }
 e.preventDefault()
})

//Delete event
document.querySelector("table").addEventListener("click", function(e){
    if(e.target.classList.contains("cancel-icon")){
        e.target.parentElement.parentElement.remove()

        totalUnits-Number(e.target.parentElement.parentElement.firstElementChild.nextElementSibling.textContent)
        totalPoints-Number(e.target.parentElement.parentElement.lastElementChild.previousElementSibling.previousElementSibling.textContent)

        removeFromLocalStorage = new LocalStorage()
        removeFromLocalStorage.removeInLS(e.target.parentElement.parentElement)
    }
})

//Clear Event
document.querySelector("#clear-btn").addEventListener("click", function(){
    document.querySelector("table").innerHTML = ` <tr>
    <th>Course Title</th>
    <th>Course Unit</th>
    <th>Score</th>
    <th>Point</th>
    <th>Grade</th>
    <th></th>
</tr>`

    totalPoints = 0
    totalUnits = 0

    localStorage.clear()
})

//Calculate GP Event
document.querySelector("#calc-gpa-btn").addEventListener("click", function(){
    if(totalUnits === 0 ){
        alert("Nothing to calculate")
    }else{
    alert((totalPoints/totalUnits).toFixed(2))
    }
})


//Load table from Local storage
loadFromLS()
function loadFromLS(){
    let courseInfo;
    if(localStorage.getItem('courseInfo') === null){
        courseInfo = []
    }
    else{
        courseInfo = JSON.parse(localStorage.getItem('courseInfo'))
    }

    courseInfo.forEach(function(obj){
        courseDetailsFromLS = new CourseDetails(obj.title, obj.unit, obj.score, obj.point, obj.grade)
        courseDetailsFromLS.addDetailstoTable()
        courseDetailsFromLS.sumUpPoints()
        courseDetailsFromLS.sumUpUnits()
    })
}
document.addEventListener('DOMcontentloaded', loadFromLS);
