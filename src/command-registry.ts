import { Type } from '@nestjs/common';
import {
  CommandMetadata,
  CommandOptions,
  OptionOptions,
  PositionalOptions,
} from './types/command-options';

const COMMAND_META = new Map<
  string | Type<any>,
  Record<string | symbol, CommandOptions>
>();
const POSITIONAL_META = new Map<
  string | Type<any>,
  Record<string | symbol, Record<number, PositionalOptions>>
>();
const OPTION_META = new Map<
  string | Type<any>,
  Record<string | symbol, Record<number, OptionOptions>>
>();

export class CommandRegistry {
  static getCommands(): CommandMetadata[] {
    const commands: CommandMetadata[] = [];

    for (const [target, properties] of COMMAND_META.entries()) {
      for (const propertyKey in properties) {
        const positionals = POSITIONAL_META.get(target)?.[propertyKey] ?? {};
        const optionals = OPTION_META.get(target)?.[propertyKey] ?? {};

        commands.push({
          target,
          propertyKey,
          options: properties[propertyKey],
          positionals: Object.keys(positionals).map((parameterIndex) => {
            return {
              parameterIndex: Number(parameterIndex),
              options: positionals[Number(parameterIndex)],
            };
          }),
          optionals: Object.keys(optionals).map((parameterIndex) => {
            return {
              parameterIndex: Number(parameterIndex),
              options: optionals[Number(parameterIndex)],
            };
          }),
        });
      }
    }

    return commands;
  }

  static registerCommand(
    target: string | Type<any>,
    propertyKey: string | symbol,
    options: CommandOptions,
  ) {
    const meta = COMMAND_META.get(target) ?? {};

    if (meta[propertyKey]) {
      throw new Error(
        `CommandRegistry: Command metadata for property '${String(
          propertyKey,
        )}' already exists.`,
      );
    }

    meta[propertyKey] = options;
    COMMAND_META.set(target, meta);
  }

  static registerPositional(
    target: string | Type<any>,
    propertyKey: string | symbol,
    parameterIndex: number,
    options: PositionalOptions,
  ) {
    const meta = POSITIONAL_META.get(target) ?? {};

    if (!meta[propertyKey]) {
      meta[propertyKey] = {};
    }

    if (meta[propertyKey][parameterIndex]) {
      throw new Error(
        `CommandRegistry: Positional metadata for property '${String(
          propertyKey,
        )}' on '${String(
          target,
        )}', parameterIndex='${parameterIndex}' already exists.`,
      );
    }

    meta[propertyKey][parameterIndex] = options;

    POSITIONAL_META.set(target, meta);
  }

  static registerOption(
    target: string | Type<any>,
    propertyKey: string | symbol,
    parameterIndex: number,
    options: OptionOptions,
  ) {
    const meta = OPTION_META.get(target) ?? {};

    if (!meta[propertyKey]) {
      meta[propertyKey] = {};
    }

    if (meta[propertyKey][parameterIndex]) {
      throw new Error(
        `CommandRegistry: Option metadata for property '${String(
          propertyKey,
        )}' on '${String(
          target,
        )}', parameterIndex='${parameterIndex}' already exists.`,
      );
    }

    meta[propertyKey][parameterIndex] = options;

    OPTION_META.set(target, meta);
  }
}
