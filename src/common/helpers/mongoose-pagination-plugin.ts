import { DatabaseConstants } from '../constants/database';
import * as Url from 'url';

export const MongoosePaginatePlugin = (schema, options) => {
  options = options || {};
  schema.query.paginate = async function (paginationInfo) {
    const limit =
      parseInt(paginationInfo.limit) ||
      options.limit ||
      DatabaseConstants.PAGINATE_LIMIT_DEFAULT;
    const pagination = {
      currentPage: 1,
      perPage: limit,
      totalPage: 1,
      nextLink: null,
      prevLink: null,
    };
    const page = parseInt(paginationInfo.page);
    pagination.currentPage = page > 0 ? page : pagination.currentPage;
    const offset = (pagination.currentPage - 1) * limit;

    const [data, count] = await Promise.all([
      this.limit(limit).skip(offset),
      this.model.countDocuments(this.getQuery()),
    ]);
    pagination.totalPage = Math.ceil(count / limit);

    // set next and prev url
    if (paginationInfo.url) {
      const url = new URL(paginationInfo.url);
      if (pagination.currentPage < pagination.totalPage) {
        url.searchParams.set('page', String(pagination.currentPage + 1));
        pagination.nextLink = url.toString();
      }

      if (pagination.currentPage > 1) {
        url.searchParams.set('page', String(pagination.currentPage - 1));
        pagination.prevLink = url.toString();
      }
    }
    //

    return { data, pagination };
  };
};
