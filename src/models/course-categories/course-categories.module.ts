import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseCategoriesController } from './course-categories.controller';
import { CourseCategoriesService } from './course-categories.service';
import {
  CourseCategorySchema,
  CourseCategory,
} from './schema/course-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CourseCategory.name, schema: CourseCategorySchema },
    ]),
  ],
  controllers: [CourseCategoriesController],
  providers: [CourseCategoriesService],
})
export class CourseCategoriesModule {}
