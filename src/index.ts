#!/usr/bin/env node
'use strict';

import { generatePwd } from 'pwdr';
import { Command } from 'commander';
import {
  handleError,
  isBlank,
  OUTPUT_KEY,
  OUTPUT_LINE_SEPARATOR,
  OUTPUT_PHRASE,
  OUTPUT_PWD,
  OUTPUT_SECTION_SEPARATOR,
  parseInteger,
  prepareArgs,
  prepareKeys,
  writeToConsole,
} from './utils.js';

interface Opts {
  phrase: string;
  keys: string[];
  length: number;
}

type Run = (opts: Opts) => Promise<string[]>;

export const run: Run = async ({ phrase, keys, length }) => {
  if (isBlank(phrase)) throw new Error('Secret phrase is required');
  if (keys.length === 0) throw new Error('At least one secret key needs to be provided');

  const output = [OUTPUT_SECTION_SEPARATOR, `${OUTPUT_PHRASE} ${phrase}`, OUTPUT_SECTION_SEPARATOR];

  const pwds = await Promise.all(keys.map((key) => generatePwd(phrase.trim(), key.trim(), length)));
  pwds.forEach((pwd, i) => {
    output.push(`${OUTPUT_KEY} ${keys[i]}`);
    output.push(`${OUTPUT_PWD} ${pwd}`);
    output.push(OUTPUT_LINE_SEPARATOR);
  });

  return output;
};

const opts = new Command()
  .name('npx pwdr-cli')
  .version('v1.0.0')
  .description('Command line interface for pwdr npm package')
  .usage('-p <secret-phrase> -k <secret-keys> [-l <password-length>]')
  .requiredOption('-p, --phrase <secret-phrase>', 'secret phrase')
  .requiredOption('-k, --keys <secret-keys...>', 'secret key(s)', prepareKeys)
  .option('-l, --length <password-length>', 'password length', parseInteger, 32)
  .configureOutput({
    writeErr: handleError,
  })
  .parse(prepareArgs(process.argv))
  .opts() as Opts;

run(opts).then(writeToConsole).catch(handleError);
