import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { isTimeDivisionValid } from '../../../common/decorators/validations/is-time-division-valid.validation';
import { TimetableDto } from './timetable.dto';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3000)
  description: string;

  @ApiProperty({
    required: false,
    description: 'default: false',
  })
  @IsBoolean()
  hasExam: boolean;

  @ApiProperty({
    example: 20,
  })
  @IsInt()
  @Min(1)
  workload: number;

  @ApiProperty({
    example: {
      lecture: 10,
      etc: 10,
    },
  })
  @IsObject()
  @IsNotEmptyObject()
  @isTimeDivisionValid()
  timeDivision: Record<string, number>;

  @ApiProperty({
    example: [
      {
        teacher: 'joey',
        weekDay: 2,
        start: '1200',
        end: '1430',
      },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsObject({ each: true })
  @IsNotEmptyObject({}, { each: true })
  @ValidateNested({ each: true })
  @Type(() => TimetableDto)
  timetable: TimetableDto[];

  @IsOptional()
  @IsString()
  venue?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({
    each: true,
  })
  prerequisite?: string[];
}
