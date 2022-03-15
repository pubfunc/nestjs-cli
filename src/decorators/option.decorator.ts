import { Type } from '@nestjs/common';
import { CommandRegistry } from 'src/command-registry';
import { OptionOptions } from 'src/types/command-options';

export function Option(
  name: string,
  options: Omit<OptionOptions, 'name'>,
): ParameterDecorator;
export function Option(options: OptionOptions): ParameterDecorator;
export function Option(
  name: string | OptionOptions,
  options?: Omit<OptionOptions, 'name'>,
): ParameterDecorator {
  return (
    target: object,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    CommandRegistry.registerOption(
      target.constructor as Type<any>,
      propertyKey,
      parameterIndex,
      typeof name === 'string' ? { ...options, name } : name,
    );
  };
}
