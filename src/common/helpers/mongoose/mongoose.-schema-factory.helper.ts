import { SchemaFactory } from '@nestjs/mongoose';
import { MongoosePaginatePlugin } from './mongoose-pagination-plugin';
import { DatabaseConstants } from '../../constants/database';

export function CreateSchema(schema) {
  return SchemaFactory.createForClass(schema)
    .plugin(MongoosePaginatePlugin, {
      limit: DatabaseConstants.PAGINATE_LIMIT_DEFAULT,
    })
    .static('paginate', () => {
      //
    });
}
