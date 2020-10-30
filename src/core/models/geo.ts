export default class Geo {
  public lat: string;

  public lng: string;

  public constructor(data: Geo) {
    this.lat = data.lat;
    this.lng = data.lng;
  }
}
