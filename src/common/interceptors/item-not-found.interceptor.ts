import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request } from 'express';
import * as mongoose from 'mongoose';

@Injectable()
export class ItemNotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const id = request.params.id;
    const exception = new NotFoundException('item not found');

    if (id && !mongoose.Types.ObjectId.isValid(id)) throw exception;

    return next.handle().pipe(
      map((value) => {
        if (value === null) throw exception;
        return value;
      }),
    );
  }
}
