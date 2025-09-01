import { Storage } from "./storage.js";
import { Note } from "./note.js";

export class UI {
  constructor() {
    this.notesContainer = document.getElementById("notesContainer");
  }

  renderNotes() {
    const notes = Storage.getNotes();
    this.notesContainer.innerHTML = notes.map(note => note.render()).join("");
  }

  addNote() {
    const newNote = new Note(Date.now(), "New Note", new Date());
    Storage.saveNote(newNote);
    this.renderNotes();
  }
}
