export default class Comment {
  public id: number;

  public postId: number;

  public name: string;

  public email: string;

  public body: string;

  public authorAvatar: string;

  public constructor(data: Comment) {
    this.id = data.id;
    this.postId = data.postId;
    this.name = data.name;
    this.email = data.email;
    this.body = data.body;
    this.authorAvatar = data.authorAvatar;
  }
}
