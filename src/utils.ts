'use strict';

import { InvalidArgumentError } from 'commander';
import chalk from 'chalk';

export type IsBlank = (val?: string | null) => boolean;
export type HandleError = (err?: Error | string | unknown) => void;
export type PrepareKeys = (val: string, prev?: string[]) => string[];
export type PrepareArgs = (args: string[]) => string[];
export type ParseInteger = (val: string) => number;
export type WriteToConsole = (output: string[]) => void;

export const OUTPUT_SECTION_SEPARATOR = '=';
export const OUTPUT_LINE_SEPARATOR = '-';
export const OUTPUT_PHRASE = ' PHRASE ';
export const OUTPUT_KEY = ' KEY ';
export const OUTPUT_PWD = ' PWD ';

export const isBlank: IsBlank = (val) => {
  return val === undefined || val === null || val === '' || val.trim() === '';
};

export const handleError: HandleError = (err) => {
  let message = 'Better luck next time ;)';

  if (typeof err === 'string') {
    message = err;
  }
  if (err instanceof Error) {
    message = err.message;
  }

  console.error(chalk.bgRedBright.whiteBright.bold(message));
};

export const prepareKeys: PrepareKeys = (val, prev) => {
  prev = prev ?? [];
  if (!isBlank(val)) prev.push(val);
  return prev;
};

export const prepareArgs: PrepareArgs = (args) => {
  return args.flatMap((arg) => (arg.startsWith('-') ? ['', arg] : [arg]));
};

export const parseInteger: ParseInteger = (val) => {
  const res = parseInt(val, 10);
  if (isNaN(res)) {
    throw new InvalidArgumentError('Not a number.');
  }
  return res;
};

export const writeToConsole: WriteToConsole = (output) => {
  const longestOutput = Math.max(...output.map((str) => str.length));

  output
    .map((str) => {
      if (str.startsWith(OUTPUT_SECTION_SEPARATOR) || str.startsWith(OUTPUT_LINE_SEPARATOR)) {
        return chalk.bold(str.repeat(longestOutput));
      }
      if (str.startsWith(OUTPUT_PHRASE)) {
        return str.replace(OUTPUT_PHRASE, chalk.bgGreenBright.whiteBright.bold(OUTPUT_PHRASE));
      }
      if (str.startsWith(OUTPUT_KEY)) {
        return str.replace(OUTPUT_KEY, chalk.bgGreenBright.whiteBright.bold(OUTPUT_KEY));
      }
      if (str.startsWith(OUTPUT_PWD)) {
        return str.replace(OUTPUT_PWD, chalk.bgGreenBright.whiteBright.bold(OUTPUT_PWD));
      }
      return str;
    })
    .forEach((str) => console.log(str)); // eslint-disable-line no-console
};
