export default class Post {
  public id: number;

  public userId: number;

  public title: string;

  public body: string;

  public constructor(data: Post) {
    this.id = data.id;
    this.userId = data.userId;
    this.title = data.title;
    this.body = data.body;
  }
}
