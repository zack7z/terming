import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError & { keyValue: string }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let responseBody = null;

    switch (exception.code) {
      case 11000:
        responseBody = {
          statusCode: 400,
          message: [`${Object.keys(exception.keyValue)[0]} must be unique`],
          error: 'Bad Request',
        };
    }

    response.status(400).json(responseBody);
  }
}
