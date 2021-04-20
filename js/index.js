function initNoteListe() {// fonction appelle a chaque initialisation du project
    let note = Object.keys(localStorage);
    if (!(note.length == 0)) {// this will be executed when we will have somthing in the storage object
        note.forEach(element => {

            let aux = localStorage.getItem(element); 
            let note = JSON.parse(aux);
            // accer a la note
            add1(note.notetxt, element);
            console.log("date" + note.date.date);
            console.log("note texte " + note.notetxt);

        });
    } else {
        console.log("aucune donner n'ai stocker");
    }
}


window.addEventListener("load", initNoteListe); // initialisation de liste pour etre vu .
document.querySelector(".addbutton").addEventListener('click', add);


function add() {// THIS FUNCTION WILL be an event hendler for adding elemnt
    let input = document.querySelector("#input");

    let noteliste = document.querySelector(".noteliste");
    let note = addNote(input.value);
    noteliste.prepend(note);
}

function add1(txt, id) {
    let input = document.querySelector("#input");

    let noteliste = document.querySelector(".noteliste");
    let note = notecrafting(txt, id);

    noteliste.prepend(note);
}

function addNote(txtnote) {
    let date = new Date();
    let auxdate = date.toLocaleDateString(); 
    let auxtime = date.toLocaleTimeString(); 
    let note = {
        "notetxt": txtnote,
        "date": {
            "date": auxdate,
            "time": auxtime
        }
    }
    let noteName =namegenerator();
    localStorage[noteName] = JSON.stringify(note); // enregistement de la note sous forma de texte 
    return (notecrafting(txtnote, noteName)); // cration dune elemnt note et renvoie 

}




function namegenerator() {
    localStorage.hasOwnProperty("note" + localStorage.length)
    let nom ; 
    let i; 
    i = localStorage.length; 
    do {
    nom = ("note"+i) ; 
    i++;
    } while (localStorage.hasOwnProperty(nom));
    return nom; 
}





function notecrafting(txt, noteid) {
    let note = document.createElement("div");
    note.id = noteid;
    let notetxt = document.createElement("p");
    notetxt.innerText = txt;
    let button = document.createElement("button");
    button.innerText = "delete";
    button.addEventListener("click", deleteNote);
    note.appendChild(notetxt);
    note.appendChild(button);
    return note;
}


function deleteNote() {
    // removing the elemnt from the database 
    localStorage.removeItem(this.parentElement.id);// removing the data from the localstorage 
    this.parentElement.remove();// removing the documùent from document 
}