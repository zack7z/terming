import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CourseCategoriesService } from './course-categories.service';
import { CreateCourseCategoryDto } from './dto/create-course-category.dto';
import { GeoLocationPipe } from '../../common/pipes/mongodb/geo-location.pipe';
import { UpdateCourseCategoryDto } from './dto/update-course-category.dto';
import { GetId } from '../../common/decorators/requests/get-id.decorator';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ItemNotFoundInterceptor } from '../../common/interceptors/item-not-found.interceptor';
import {
  ApiPaginationModel,
  PaginationModel,
} from '../../common/responses/pagination.model';
import { GetPaginationInfo } from '../../common/decorators/requests/get-pagination-info.decorator';
import { PaginationInfo } from '../../common/interfaces/mongodb/pagination-info.interface';
import { CourseCategory } from './schema/course-category.schema';
import { Schema } from 'mongoose';

@ApiTags('course-categories')
@UseInterceptors(ItemNotFoundInterceptor)
@Controller({
  version: '1',
  path: 'course-categories',
})
export class CourseCategoriesController {
  constructor(readonly courseCategoriesService: CourseCategoriesService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiOkResponse({ type: ApiPaginationModel })
  async all(
    @GetPaginationInfo() paginationInfo: PaginationInfo,
  ): Promise<PaginationModel<CourseCategory>> {
    return this.courseCategoriesService.all(paginationInfo);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async show(@GetId() id: string): Promise<CourseCategory> {
    return this.courseCategoriesService.show(id);
  }

  @Post()
  async create(
    @Body() createCourseCategoryDto: CreateCourseCategoryDto,
  ): Promise<CourseCategory> {
    return await this.courseCategoriesService.create(createCourseCategoryDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(
    @GetId() id: string,
    @Body() updateCourseCategoryDto: UpdateCourseCategoryDto,
  ): Promise<CourseCategory> {
    return this.courseCategoriesService.update(id, updateCourseCategoryDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async delete(@GetId() id: Schema.Types.ObjectId): Promise<CourseCategory> {
    return this.courseCategoriesService.delete(id);
  }
}
