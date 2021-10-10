import { Prop, raw, Schema } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { CreateSchema } from '../../../common/helpers/mongoose/mongoose.-schema-factory.helper';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { DatabaseConstants } from '../../../common/constants/database';

export type CourseCategoryDocument = CourseCategory & Document;

@Schema({
  collection: 'courseCategories',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
})
export class CourseCategory {
  _id: string;

  @ApiHideProperty()
  @Prop({ select: false })
  __v: number;

  @Prop({ required: true })
  title: string;

  @ApiProperty({ type: String })
  @Prop({
    required: false,
    type: mongooseSchema.Types.ObjectId,
    default: undefined,
  })
  parentId?: mongooseSchema.Types.ObjectId;

  @ApiProperty({
    type: CourseCategory,
    example: {
      _id: 'string',
      title: 'string',
      parentId: 'string',
    },
    description: 'only available at all endpoint',
  })
  subCategories?: CourseCategory[];
}

const schema = CreateSchema(CourseCategory);

schema.index({ parentId: 1 }, { sparse: true });

schema.virtual('subCategories', {
  ref: 'CourseCategory',
  localField: '_id',
  foreignField: 'parentId',
  justOne: false,
});

export const CourseCategorySchema = schema;
