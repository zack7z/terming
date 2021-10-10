import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVenueDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty({
    description: 'must be unique',
  })
  code: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @ApiProperty({ required: false })
  type: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  floor: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber(
    { maxDecimalPlaces: 8 },
    {
      each: true,
    },
  )
  @ApiProperty({
    required: false,
    type: [Number],
    description:
      'an array with two numbers, first is longitude and second is latitude',
    example: [125.3, 55.6564],
  })
  location;
}
