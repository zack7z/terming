import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Venue, VenueDocument } from './schema/venue.schema';
import { Model } from 'mongoose';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PaginationModel } from "../../common/responses/pagination.model";
import { PaginationInfo } from "../../common/interfaces/pagination-info.interface";

@Injectable()
export class VenuesService {
  constructor(
    @InjectModel(Venue.name) private readonly venueModel: Model<VenueDocument>,
  ) {}

  async all(paginationInfo: PaginationInfo): Promise<PaginationModel<Venue>> {
    // @ts-ignore
    return this.venueModel.find().paginate({ paginationInfo: paginationInfo });
  }

  async show(id: string) {
    return this.venueModel.findById(id);
  }

  async create(createVenueDto: CreateVenueDto): Promise<Venue> {
    const createVenue = new this.venueModel(createVenueDto);
    return await createVenue.save();
  }

  async update(id: string, updateVenueDto: UpdateVenueDto): Promise<Venue> {
    return this.venueModel.findByIdAndUpdate(id, updateVenueDto, { new: true });
  }

  async delete(id: string): Promise<Venue> {
    return this.venueModel.findByIdAndDelete(id);
  }
}
