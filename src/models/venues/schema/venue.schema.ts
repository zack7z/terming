import { Prop, raw, Schema } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { DatabaseConstants } from '../../../common/constants/database';
import { GeoPoint } from '../../../common/interfaces/mongodb/geo-point.interface';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { CreateSchema } from '../../../common/helpers/mongoose/mongoose.-schema-factory.helper';

export type VenueDocument = Venue & Document;

@Schema()
export class Venue {
  _id: string;

  @ApiHideProperty()
  @Prop({ select: false })
  __v: number;

  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  code: string;

  @Prop()
  type: string;

  @Prop({ required: true })
  floor: string;

  @Prop(
    raw({
      _id: false,
      required: false,
      type: new mongooseSchema(DatabaseConstants.MONGOOSE_POINT_SCHEMA),
    }),
  )
  @ApiProperty({
    required: false,
    type: DatabaseConstants.MONGOOSE_POINT_SCHEMA,
  })
  location: GeoPoint;
}

export const VenueSchema = CreateSchema(Venue);
