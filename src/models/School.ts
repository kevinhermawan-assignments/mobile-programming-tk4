export default class School {
  private id: number;
  private name: string;
  private address: string;
  private latitude: number;
  private longitude: number;
  private isEligible: boolean;

  constructor(
    id: number,
    name: string,
    address: string,
    latitude: number,
    longitude: number,
    isEligible: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.isEligible = isEligible;
  }

  getId() {
    return this.id.toString();
  }

  getName() {
    return this.name;
  }

  getAddress() {
    return this.address;
  }

  getLatitude() {
    return parseFloat(this.latitude.toString());
  }

  getLongitude() {
    return parseFloat(this.longitude.toString());
  }

  getIsEligible() {
    return this.isEligible;
  }
}
