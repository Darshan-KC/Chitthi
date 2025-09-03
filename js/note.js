export class Note {
  constructor(id, content, createdAt) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.colorClass = this.getRandomColor();
  }

  getRandomColor() {
    const colors = [
      "note-color-1",
      "note-color-2",
      "note-color-3",
      "note-color-4",
      "note-color-5",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  render() {
    return `
      <div class="note ${this.colorClass}" data-id="${this.id}">
        <p contenteditable="true">${this.content}</p>
      </div>
    `;
  }
}
