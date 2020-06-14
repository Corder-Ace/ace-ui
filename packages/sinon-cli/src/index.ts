#!/usr/bin/env node
import {command, parse, version} from 'commander';

// @ts-ignore
import packageJson from '../package.json';
import {build} from './commands/build';

command('build')
  .description('Compile components in production mode')
  .option('--watch', 'Watch file change')
  .action(build);

parse();
