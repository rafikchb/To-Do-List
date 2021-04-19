function initNoteListe() {// fonction appelle a chaque initialisation du project
    let note = Object.keys(localStorage);
    if (!(note.length == 0)) {// this will be executed when we will have somthing in the storage object
        note.forEach(element => {

            let aux = localStorage[element] // ici on obtien lelement txt
            let note = JSON.parse(aux);
            // accer a la note
            add1(note.notetxt); 
            console.log("date" + note.date.date);
            console.log("note texte " + note.notetxt);

            note.notetxt;
            note.date;

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
    let note;

    note = addNote(input.value);

    noteliste.prepend(note);
}

function add1(txt) {
    let input = document.querySelector("#input");

    let noteliste = document.querySelector(".noteliste");
    let note = notecrafting(txt);
    
    noteliste.prepend(note);
}

function addNote(txtnote) {
    // get the data ;
    let date = new Date();
    let auxdate = date.toLocaleDateString(); // la date
    let auxtime = date.toLocaleTimeString(); // le temp
    ////////////////////////// ajout de la note a la base de donner ///////////////////////////////////////////////////
    let note = {// creation de lobject qui sera stocker
        "notetxt": txtnote,
        "date": {
            "date": auxdate,
            "time": auxtime
        }
    }
    let noteName = "note" + localStorage.length;
    localStorage[noteName] = JSON.stringify(note); // enregistement de la note sous forma de texte 
    return (notecrafting(txtnote)); // cration dune elemnt note et renvoie 

}





function notecrafting(noteTxt) {
    let note = document.createElement("div");
    //     note.className = "note";
    //     note.innerHTML = ` <p>${noteTxt} </p>
    // <button class="btnfait" type="button">fait</button>
    // <button class="" type="button">suprimer </button>`;
    note.innerHTML = `<p>${noteTxt} </p>`;
    return note;
}



