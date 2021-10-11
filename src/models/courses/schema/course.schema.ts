import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiHideProperty } from '@nestjs/swagger';
import { CreateSchema } from '../../../common/helpers/mongoose/mongoose.-schema-factory.helper';
import { TimetableDto } from '../dto/timetable.dto';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  _id: string;

  @ApiHideProperty()
  @Prop({ select: false })
  __v: number;

  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    default: false,
  })
  hasExam: boolean;

  @Prop({
    required: true,
  })
  workload: number;

  @Prop({
    required: true,
    type: Map,
    of: Number,
  })
  timeDivision: Record<string, number>;

  @Prop({
    required: true,
    type: [
      {
        teacher: String,
        weekDay: Number,
        start: Number,
        end: Number,
      },
    ],
  })
  timetable: TimetableDto[];

  @Prop({
    required: false,
    default: undefined,
  })
  venue: string;

  @Prop({
    required: false,
    default: undefined,
  })
  category: string;

  @Prop({
    required: false,
    default: undefined,
    type: [String],
  })
  prerequisite: string[];
}

export const CourseSchema = CreateSchema(Course);
