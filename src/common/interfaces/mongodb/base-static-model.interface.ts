import { Model } from 'mongoose';
import { PaginationInfo } from './pagination-info.interface';
import { PaginationModel } from '../../responses/pagination.model';

export interface BaseStaticModel<T> extends Model<T> {
  paginate(paginationInfo: PaginationInfo): PaginationModel<T>;
}
