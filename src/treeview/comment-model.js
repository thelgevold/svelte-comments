export class CommentModel {
  constructor(data) {
    this.text = data['text'];
    this.author = data['author'];
    this.created = new Date(data['created']).toDateString();
  }
}