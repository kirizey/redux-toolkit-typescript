import GeoDto from './geo-dto';

export default interface AddressDto {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoDto;
};
