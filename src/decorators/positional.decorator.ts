import { Type } from '@nestjs/common';
import { CommandRegistry } from 'src/command-registry';
import { PositionalOptions } from 'src/types/command-options';

export function Positional(
  name: string,
  options: Omit<PositionalOptions, 'name'>,
): ParameterDecorator;
export function Positional(options: PositionalOptions): ParameterDecorator;
export function Positional(
  name: string | PositionalOptions,
  options?: Omit<PositionalOptions, 'name'>,
): ParameterDecorator {
  return (
    target: object,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) => {
    CommandRegistry.registerPositional(
      target.constructor as Type<any>,
      propertyKey,
      parameterIndex,
      typeof name === 'string' ? { ...options, name } : name,
    );
  };
}
