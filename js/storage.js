export const Storage = {
  getNotes() {
    return JSON.parse(localStorage.getItem("chitthi_notes")) || [];
  },

  saveNotes(notes) {
    localStorage.setItem("chitthi_notes", JSON.stringify(notes));
  },

  saveNote(note) {
    const notes = this.getNotes();
    notes.push(note);
    this.saveNotes(notes);
  },

  updateNotePosition(id, x, y) {
    const notes = this.getNotes();
    const note = notes.find((n) => n.id === id);
    if (note) {
      note.x = x;
      note.y = y;
      this.saveNotes(notes);
    }
  },

  updateNoteContent(id, newContent) {
    const notes = this.getNotes();
    const note = notes.find((n) => n.id === id);
    if (note) {
      note.content = newContent;
      this.saveNotes(notes);
    }
  },
};
