export class Note {
  constructor(id, content, createdAt) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
  }

  render() {
    return `<div class="note">${this.content}</div>`;
  }
}
