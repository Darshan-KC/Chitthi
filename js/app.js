import { UI } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  ui.renderNotes();

  const addBtn = document.getElementById("addNoteBtn");
  addBtn.addEventListener("click", () => {
    // console.log("here");
    ui.addNote();
  });
});
