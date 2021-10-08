import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  CourseCategory,
  CourseCategoryDocument,
} from './schema/course-category.schema';
import { Connection, Model, Schema } from 'mongoose';
import { CreateCourseCategoryDto } from './dto/create-course-category.dto';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';
import { PaginationInfo } from '../../common/interfaces/mongodb/pagination-info.interface';
import { BaseStaticModel } from '../../common/interfaces/mongodb/base-static-model.interface';
import { PaginationModel } from '../../common/responses/pagination.model';
import { Venue } from '../venues/schema/venue.schema';

@Injectable()
export class CourseCategoriesService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(CourseCategory.name)
    private readonly courseCategoryModel: Model<
      CourseCategoryDocument,
      BaseStaticModel<CourseCategory>
    >,
  ) {}

  async all(
    paginationInfo: PaginationInfo,
  ): Promise<PaginationModel<CourseCategory>> {
    const test = await this.courseCategoryModel
      .find({ parentId: undefined })
      .populate('subCategories')
      .paginate(paginationInfo);

    return test;
  }

  async show(id: string) {
    return this.courseCategoryModel.findById(id);
  }

  async create(
    createCourseCategoryDto: CreateCourseCategoryDto,
  ): Promise<CourseCategory> {
    const parentId = createCourseCategoryDto.parentId;
    if (parentId) {
      const parent = await this.courseCategoryModel.findById(parentId);
      if (!parent) throw new NotFoundException('parentId is invalid');
      if (parent.parentId)
        throw new BadRequestException('only one level subcategory allowed');
    }

    const createCourseCategory = new this.courseCategoryModel(
      createCourseCategoryDto,
    );

    return await createCourseCategory.save();
  }

  async update(
    id: string,
    updateCourseCategoryDto: UpdateCourseCategoryDto,
  ): Promise<CourseCategory> {
    return this.courseCategoryModel.findByIdAndUpdate(
      id,
      updateCourseCategoryDto,
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async delete(id: Schema.Types.ObjectId): Promise<CourseCategory> {
    let courseCategory;

    await this.connection.transaction(async (session) => {
      await this.courseCategoryModel.deleteMany(
        {
          parentId: id,
        },
        { session },
      );
      courseCategory = await this.courseCategoryModel.findByIdAndDelete(id, {
        session,
      });
    });

    return courseCategory;
  }
}
