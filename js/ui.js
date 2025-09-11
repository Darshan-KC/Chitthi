import { Storage } from "./storage.js";
import { Note } from "./note.js";

export class UI {
  constructor() {
    this.notesContainer = document.getElementById("notesContainer");
    this.draggingNote = null;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  renderNotes() {
    let notesData = Storage.getNotes();

    // Auto-create a note if none exist
    if (notesData.length === 0) {
      const defaultNote = {
        id: Date.now(),
        content: "New Note",
        createdAt: new Date().toISOString(),
        x: 50,
        y: 50,
      };
      Storage.saveNote(defaultNote);
      notesData = Storage.getNotes();
    }

    this.notesContainer.innerHTML = notesData
      .map((noteData) => {
        const note = new Note(
          noteData.id,
          noteData.content,
          noteData.createdAt,
          noteData.x,
          noteData.y
        );
        return note.render();
      })
      .join("");

    this.addNoteListeners();
  }

  addNote() {
    const noteObj = {
      id: Date.now(),
      content: "New Note",
      createdAt: new Date().toISOString(),
      x: 50,
      y: 50,
    };
    Storage.saveNote(noteObj);
    this.renderNotes();
  }

  addNoteListeners() {
    const notes = document.querySelectorAll(".note");

    notes.forEach((note) => {
      const p = note.querySelector("p");

      // Dragging
      note.addEventListener("mousedown", (e) => {
        this.draggingNote = note;
        const rect = note.getBoundingClientRect();
        this.offsetX = e.clientX - rect.left;
        this.offsetY = e.clientY - rect.top;
        note.style.zIndex = 1000;
      });

      // Auto-save content
      p.addEventListener("input", () => {
        const id = Number(note.dataset.id);
        Storage.updateNoteContent(id, p.innerText);
      });
    });

    // Handle dragging
    document.addEventListener("mousemove", (e) => {
      if (!this.draggingNote) return;
      this.draggingNote.style.left = `${e.clientX - this.offsetX}px`;
      this.draggingNote.style.top = `${e.clientY - this.offsetY}px`;
    });

    document.addEventListener("mouseup", () => {
      if (!this.draggingNote) return;
      const id = Number(this.draggingNote.dataset.id);
      const x = parseInt(this.draggingNote.style.left);
      const y = parseInt(this.draggingNote.style.top);
      Storage.updateNotePosition(id, x, y);
      this.draggingNote.style.zIndex = "";
      this.draggingNote = null;
    });
  }
}
