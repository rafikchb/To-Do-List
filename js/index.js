function initNoteListe() {// fonction appelle a chaque initialisation du project
    let noteList = Object.keys(localStorage);
    if (!(noteList.length == 0)) {// this will be executed when we will have somthing in the storage object
        noteList.forEach(element => {
            let noteliste = document.querySelector(".noteliste");
            let note = auxNotecrafting(element);
            noteliste.prepend(note);
        });
    } else {
        console.log("aucune donner n'ai stocker");
    }
}

function addNote() {
    ///////////////////////////////// POUR enelever un beug 
    let btn = this.parentElement.querySelector("button"); 
    btn.className = btn.className.replace(" showbtn", ""); 
    ////////////////////////////////
    console.log('ok'); 
    let input = document.querySelector("#input");
    let noteliste = document.querySelector(".noteliste");
    txtnote = input.value;
    let date = new Date();
    let auxdate = date.toLocaleDateString();
    let note = {
        "notetxt": txtnote,
        "date": auxdate,
        "done": false,
        "coolor": "none"
    }
    let noteName = idGenerator();
    localStorage[noteName] = JSON.stringify(note); // enregistement de la note sous forma de texte 
    noteliste.prepend(auxNotecrafting(noteName));

}

function idGenerator() {
    localStorage.hasOwnProperty("note" + localStorage.length)
    let nom;
    let i;
    i = localStorage.length;
    do {
        nom = ("note" + i);
        i++;
    } while (localStorage.hasOwnProperty(nom));
    return nom;
}

function auxNotecrafting(noteId) {
    let note = document.createElement("div");
    note.id = noteId;// ajout dun id specifique a un elemnt specifique 
    note.style.backgroundColor = JSON.parse(localStorage[noteId]).coolor;
    note.className = "noteSytle"; 

    let notetxt = document.createElement("p");
    notetxt.className = "noteTxt";
    notetxt.innerText = JSON.parse(localStorage[noteId]).notetxt;
    if (JSON.parse(localStorage[noteId]).done) {
        notetxt.className += " Strikethrough";
    }

    let notedate = document.createElement("p");
    notedate.innerText = JSON.parse(localStorage[noteId]).date;


    let deletebnt = document.createElement("button");
    deletebnt.innerText = "delete";
    deletebnt.addEventListener("click", deleteNote);

    let doneBtn = document.createElement("button");
    doneBtn.innerText = "donne";
    doneBtn.addEventListener("click", doneNote);

    note.appendChild(notetxt);
    note.appendChild(notedate);
    note.appendChild(deletebnt);
    note.appendChild(doneBtn);
    return note;
}

function doneNote() {// lecriture ici peut etre optimiser en remplassan les chanmp redondnat par 
    
    let notetxt = this.parentElement.getElementsByClassName("noteTxt")[0];
    if (JSON.parse(localStorage[this.parentElement.id]).done) {
        let note = JSON.parse(localStorage[this.parentElement.id]);
        note.done = false;
        localStorage[this.parentElement.id] = JSON.stringify(note);
        notetxt.className = notetxt.className.replace(" Strikethrough", "");
    } else {
        let note = JSON.parse(localStorage[this.parentElement.id]);
        note.done = true;
        localStorage[this.parentElement.id] = JSON.stringify(note);
        notetxt.className += " Strikethrough";
    }
}

function deleteNote() {
    // removing the elemnt from the database 
    localStorage.removeItem(this.parentElement.id);// removing the data from the localstorage 
    this.parentElement.remove();// removing the documùent from document 
}

function showAddBtn(){
    let btn = this.parentElement.querySelector("button"); 
    btn.className += " showbtn"; 
}
function desactivatBtn(){
    if(this.value == ""){
        addBtn.disabled = true; 
    }else{
        addBtn.disabled = false; 
    }
}


let input = document.querySelector("#input"); 
input.addEventListener("focus",showAddBtn); 
input.addEventListener("input", desactivatBtn);

window.addEventListener("load", initNoteListe);
let addBtn = document.querySelector(".addbutton"); 
addBtn.addEventListener('click', addNote);