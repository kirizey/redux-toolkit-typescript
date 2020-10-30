export default class Company {
  public name: string;

  public catchPhrase: string;

  public bs: string;

  public constructor(data: Company) {
    this.name = data.name;
    this.catchPhrase = data.catchPhrase;
    this.bs = data.bs;
  }
}
