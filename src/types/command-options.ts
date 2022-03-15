import { Type } from '@nestjs/common';
import type {
  PositionalOptions as YargsPositionalOptions,
  Options as YargsOptionOptions,
} from 'yargs';

export interface CommandMetadata {
  target: string | Type<any>;
  propertyKey: string | symbol;
  options: CommandOptions;
  positionals: PositionalMetadata[];
  optionals: OptionMetadata[];
}

export interface PositionalMetadata {
  parameterIndex: number;
  options: PositionalOptions;
}

export interface OptionMetadata {
  parameterIndex: number;
  options: OptionOptions;
}

export interface CommandOptions {
  name?: string;
  description: string;
  showInHelp?: boolean;
  deprecated?: boolean;
}

export type ArgumentType = 'positional' | 'option';

export interface PositionalOptions extends YargsPositionalOptions {
  name: string;
}

export interface OptionOptions extends YargsOptionOptions {
  name: string;
}
