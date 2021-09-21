import {
  Body,
  Controller,
  Delete, Get,
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
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import { ItemNotFoundInterceptor } from '../../common/interceptors/item-not-found.interceptor';
import {PaginationModel, ApiPaginationModel} from "../../common/responses/pagination.model";
import { GetPaginationInfo } from "../../common/decorators/requests/get-pagination-info.decorator";
import { PaginationInfo } from "../../common/interfaces/pagination-info.interface";

@ApiTags('venues')
@UseInterceptors(ItemNotFoundInterceptor)
@Controller({
  version: '1',
  path: 'venues',
})
export class VenuesController {
  constructor(readonly venueService: VenuesService) {}

  @Get()
  @ApiOkResponse({ type: ApiPaginationModel })
  async all(@GetPaginationInfo() paginationInfo: PaginationInfo): Promise<PaginationModel<Venue>> {
    return await this.venueService.all(paginationInfo);
  }

  @Get(':id')
  async show(@GetId() id: string): Promise<Venue> {
    return await this.venueService.show(id);
  }

  @Post()
  async create(
    @Body(GeoLocationPipe) createVenueDto: CreateVenueDto,
  ): Promise<Venue> {
    return await this.venueService.create(createVenueDto);
  }

  @Patch(':id')
  async update(
    @GetId() id: string,
    @Body(GeoLocationPipe) updateVenueDto: UpdateVenueDto,
  ): Promise<Venue> {
    return await this.venueService.update(id, updateVenueDto);
  }

  @Delete(':id')
  async delete(@GetId() id: string): Promise<Venue> {
    return await this.venueService.delete(id);
  }
}
