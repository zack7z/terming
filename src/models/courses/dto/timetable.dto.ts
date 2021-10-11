import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class TimetableDto {
  @IsString()
  @IsNotEmpty()
  teacher: string;

  @IsNumber()
  @Min(0)
  @Max(6)
  weekDay: number;

  @IsNumberString()
  @Length(4, 4)
  start: string;

  @IsNumberString()
  @Length(4, 4)
  end: string;
}
