#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const build_1 = require("./commands/build");
commander_1.command('build')
    .description('Compile components in production mode')
    .option('--watch', 'Watch file change')
    .action(build_1.build);
commander_1.parse();
