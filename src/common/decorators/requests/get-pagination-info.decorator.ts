import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {PaginationInfo} from "../../interfaces/pagination-info.interface";

export const GetPaginationInfo = createParamDecorator(
  (data: unknown, context: ExecutionContext): PaginationInfo => {
    const request = context.switchToHttp().getRequest();
    let page = Number(request.query.page);
    if (isNaN(page)) page = 1;

    const url = request.protocol + "://" + request.get('host') + request.originalUrl;

    return { page: page, url: url } as PaginationInfo;
  },
);
