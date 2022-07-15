import { registerDecorator } from 'class-validator';

export function VerifyOlympicKind() {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'verifyKind',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'The Olympics can be either winter or summer',
      },
      validator: {
        validate(value: string) {
          return (
            value.toLowerCase() === 'winter' || value.toLowerCase() === 'summer'
          );
        },
      },
    });
  };
}
