import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { Venue } from './schema/venue.schema';
import { GeoLocationPipe } from '../../common/pipes/mongodb/geo-location.pipe';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { GetId } from '../../common/decorators/requests/get-id.decorator';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ItemNotFoundInterceptor } from '../../common/interceptors/item-not-found.interceptor';
import {
  PaginationModel,
  ApiPaginationModel,
} from '../../common/responses/pagination.model';
import { GetPaginationInfo } from '../../common/decorators/requests/get-pagination-info.decorator';
import { PaginationInfo } from '../../common/interfaces/mongodb/pagination-info.interface';

@ApiTags('venues')
@UseInterceptors(ItemNotFoundInterceptor)
@Controller({
  version: '1',
  path: 'venues',
})
export class VenuesController {
  constructor(readonly venueService: VenuesService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiOkResponse({ type: ApiPaginationModel })
  async all(
    @GetPaginationInfo() paginationInfo: PaginationInfo,
  ): Promise<PaginationModel<Venue>> {
    return this.venueService.all(paginationInfo);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async show(@GetId() id: string): Promise<Venue> {
    return this.venueService.show(id);
  }

  @Post()
  async create(
    @Body(GeoLocationPipe) createVenueDto: CreateVenueDto,
  ): Promise<Venue> {
    return await this.venueService.create(createVenueDto);
  }

  @Patch(':id')
  @ApiParam({ name: 'id' })
  async update(
    @GetId() id: string,
    @Body(GeoLocationPipe) updateVenueDto: UpdateVenueDto,
  ): Promise<Venue> {
    return this.venueService.update(id, updateVenueDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async delete(@GetId() id: string): Promise<Venue> {
    return this.venueService.delete(id);
  }
}
