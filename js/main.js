const container = document.querySelector(".container");
const addNoteBtn = document.querySelector(".add-note");

addNoteBtn.addEventListener("click",addNote);

getNotes().forEach(note => {
    const noteElement=createNoteElement(note.id,note.content);
    container.insertBefore(noteElement,addNoteBtn);
});
function getNotes() {

    return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));

}

function createNoteElement(id,content){
    const element=document.createElement("textarea");
    element.classList.add("note");
    element.value=content;
    element.placeholder="Empty Note!!"

    element.addEventListener("change",()=>{
        updateNote(id,element.value);
    });

    element.addEventListener("dblclick",()=>{
        const doDelete=confirm("Wanna delete this Note ??");
        if(doDelete){
            deleteNote(id,element);
        }
    })


    return element;
}
function addNote() {
const existingNotes=getNotes();
const newNote={
    id:Math.floor(Math.random()*1000),
    content:""

};
const noteElement=createNoteElement(newNote.id,newNote.content);
container.insertBefore(noteElement,addNoteBtn);
existingNotes.push(newNote);
saveNotes(existingNotes);

}


function updateNote(id,newContent){
    const notes = getNotes();
    const target=notes.find(note=>note.id==id);
    target.content=newContent;
    saveNotes(notes);

}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id);
    saveNotes(notes);
    container.removeChild(element);

}