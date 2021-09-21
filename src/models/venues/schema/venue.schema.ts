import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { DatabaseConstants } from '../../../common/constants/database';
import { GeoPoint } from '../../../common/interfaces/mongodb/geo-point.interface';
import { ApiProperty } from '@nestjs/swagger';
import { MongoosePaginatePlugin } from '../../../common/helpers/mongoose-pagination-plugin';

export type VenueDocument = Venue & Document;

@Schema()
export class Venue {
  _id: string;

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

export const VenueSchema = SchemaFactory.createForClass(Venue).plugin(
  MongoosePaginatePlugin,
  { limit: 10 },
);