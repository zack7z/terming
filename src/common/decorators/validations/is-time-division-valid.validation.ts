import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function isTimeDivisionValid(validationOptions?: ValidationOptions) {
  validationOptions = validationOptions
    ? validationOptions
    : ({} as ValidationOptions);

  if (!validationOptions.message || validationOptions.message.length == 0) {
    validationOptions.message =
      '$property is invalid, $property sum must be same as workload';
  }

  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isTimeDivisionValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(
          timeDivision: Record<string, number>,
          args: ValidationArguments,
        ) {
          const sum = (Object.values(timeDivision) as Array<number>).reduce(
            (a, b) => a + b,
            0,
          );

          return !isNaN(sum) && sum === args.object['workload'];
        },
      },
    });
  };
}
