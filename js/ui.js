import { Storage } from "./storage.js";
import { Note } from "./note.js";

export class UI {
  constructor() {
    // this.notesContainer = document.getElementById("notesBoard");
    this.notesContainer = document.getElementById("notesContainer");
    this.draggingNote = null;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  renderNotes() {
    const notesData = Storage.getNotes();
    this.notesContainer.innerHTML = notesData.map(noteData => {
      const note = new Note(noteData.id, noteData.content, noteData.createdAt, noteData.x, noteData.y);
      return note.render();
    }).join("");

    this.addDragListeners();
  }

  addNote() {
    const newNote = new Note(Date.now(), "New Note", new Date());
    Storage.saveNote(newNote);
    this.renderNotes();
  }

  addDragListeners() {
    const notes = document.querySelectorAll(".note");
    notes.forEach(note => {
      note.addEventListener("mousedown", (e) => {
        this.draggingNote = note;
        const rect = note.getBoundingClientRect();
        this.offsetX = e.clientX - rect.left;
        this.offsetY = e.clientY - rect.top;
        note.style.zIndex = 1000;
      });
    });

    document.addEventListener("mousemove", (e) => {
      if (!this.draggingNote) return;
      this.draggingNote.style.left = `${e.clientX - this.offsetX}px`;
      this.draggingNote.style.top = `${e.clientY - this.offsetY}px`;
    });

    document.addEventListener("mouseup", () => {
      if (!this.draggingNote) return;
      const id = this.draggingNote.dataset.id;
      const x = parseInt(this.draggingNote.style.left);
      const y = parseInt(this.draggingNote.style.top);
      Storage.updateNotePosition(Number(id), x, y);
      this.draggingNote.style.zIndex = "";
      this.draggingNote = null;
    });
  }
}
