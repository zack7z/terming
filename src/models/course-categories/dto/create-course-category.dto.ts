import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { IsMongoObjectId } from '../../../common/decorators/validations/is-mongo-object-id.validation';
import { Schema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  title: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsMongoObjectId()
  parentId?: Schema.Types.ObjectId;
}
