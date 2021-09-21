import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetId = createParamDecorator(
  (data: unknown, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.params.id;
  },
);
