import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { Types } from 'mongoose';

export function IsMongoObjectId(validationOptions?: ValidationOptions) {
  validationOptions = validationOptions
    ? validationOptions
    : ({} as ValidationOptions);

  if (!validationOptions.message || validationOptions.message.length == 0) {
    validationOptions.message = '$property is invalid';
  }

  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsMongoObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(id: string, args: ValidationArguments) {
          return Types.ObjectId.isValid(id);
        },
      },
    });
  };
}
