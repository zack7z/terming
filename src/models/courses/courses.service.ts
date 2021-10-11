import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PaginationModel } from '../../common/responses/pagination.model';
import { PaginationInfo } from '../../common/interfaces/mongodb/pagination-info.interface';
import { BaseStaticModel } from '../../common/interfaces/mongodb/base-static-model.interface';
import { Course, CourseDocument } from './schema/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<
      CourseDocument,
      BaseStaticModel<Course>
    >,
  ) {}

  async all(paginationInfo: PaginationInfo): Promise<PaginationModel<Course>> {
    return this.courseModel.find().paginate(paginationInfo);
  }

  async show(id: string) {
    return this.courseModel.findById(id);
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createCourse = new this.courseModel(createCourseDto);
    return await createCourse.save();
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    return this.courseModel.findByIdAndUpdate(id, updateCourseDto, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<Course> {
    return this.courseModel.findByIdAndDelete(id);
  }
}
