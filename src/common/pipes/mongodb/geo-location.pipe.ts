import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import {GeoPoint} from "../../interfaces/mongodb/geo-point.interface";

@Injectable()
export class GeoLocationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const location = value.location;
    if (location) {
      value.location = {
        type: 'Point',
        coordinates: [Number(location[0]), Number(location[1])],
      } as GeoPoint;
    }
    return value;
  }
}
