console.log("welcome to to do list");
showlist();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.push(addTxt.value);
  notes = localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  console.log(notesObj);
  showlist();
});

function showlist() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else notesObj = JSON.parse(notes);
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
    <div class="noteCard mx-3 my-2 card" style="width: rem;">
      
                    <div class="card-body">
                      <h5 class="card-title">To-Do-${index + 1}</h5>
                      <p class="card-text" id=${index}>${element}</p>
                      <button id="${index}" onclick="deletenote(this.id)"  class="btn btn-danger" >Delete List</button>
                      <button id="${index}" onclick="completed(this.id)" class="btn btn-success" >Completed</button>
                    </div>
                    </div>
    
    
    `;
  });
  let noteElement = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteElement.innerHTML = html;
  } else {
    let error =
      "No Tasks Pending! Kindly add your to-do list by pressing 'add' button ";

    noteElement.innerHTML = error;
  }
}

function deletenote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else notesObj = JSON.parse(notes);
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showlist();
}

function completed(index) {
  let paraTxt = document.getElementById(index);

  paraTxt.style.textDecoration = "line-through";
  paraTxt.style.fontSize = "20px";
  paraTxt.style.color = "red";
}
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    // notecard ke andar har element ka p ko lenee k liye 
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    });
});
