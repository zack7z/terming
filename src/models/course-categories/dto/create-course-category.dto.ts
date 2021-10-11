import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Schema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  title: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsMongoId()
  parentId?: Schema.Types.ObjectId;
}
