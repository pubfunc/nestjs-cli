import { Type } from '@nestjs/common';
import { CommandRegistry } from '../command-registry';
import { CommandOptions } from '../types/command-options';

export function Command(
  options: CommandOptions & { name: string },
): MethodDecorator;
export function Command(name: string, options: CommandOptions): MethodDecorator;
export function Command(
  name: string | (CommandOptions & { name: string }),
  options?: CommandOptions,
): MethodDecorator {
  return (target, propertyKey) => {
    CommandRegistry.registerCommand(
      target.constructor as Type<any>,
      propertyKey,
      typeof name === 'string' ? { name, ...options } : options,
    );
  };
}
