import Geo from './geo';

export default class Address {
  public street: string;

  public suite: string;

  public city: string;

  public zipcode: string;

  public geo: Geo;

  public constructor(data: Address) {
    this.street = data.street;
    this.suite = data.suite;
    this.city = data.city;
    this.zipcode = data.zipcode;
    this.geo = data.geo;
  }
}
