import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { GeoLocationPipe } from '../../common/pipes/mongodb/geo-location.pipe';
import { UpdateCourseDto } from './dto/update-course.dto';
import { GetId } from '../../common/decorators/requests/get-id.decorator';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ItemNotFoundInterceptor } from '../../common/interceptors/item-not-found.interceptor';
import {
  PaginationModel,
  ApiPaginationModel,
} from '../../common/responses/pagination.model';
import { GetPaginationInfo } from '../../common/decorators/requests/get-pagination-info.decorator';
import { PaginationInfo } from '../../common/interfaces/mongodb/pagination-info.interface';
import { CoursesService } from './courses.service';
import { Course } from './schema/course.schema';

@ApiTags('courses')
@UseInterceptors(ItemNotFoundInterceptor)
@Controller({
  version: '1',
  path: 'courses',
})
export class CoursesController {
  constructor(readonly coursesService: CoursesService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiOkResponse({ type: ApiPaginationModel })
  async all(
    @GetPaginationInfo() paginationInfo: PaginationInfo,
  ): Promise<PaginationModel<Course>> {
    return this.coursesService.all(paginationInfo);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async show(@GetId() id: string): Promise<Course> {
    return this.coursesService.show(id);
  }

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.coursesService.create(createCourseDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(
    @GetId() id: string,
    @Body() updateVenueDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.update(id, updateVenueDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async delete(@GetId() id: string): Promise<Course> {
    return this.coursesService.delete(id);
  }
}
