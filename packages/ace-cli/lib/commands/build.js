"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const constant_1 = require("../common/constant");
const clean_1 = require("./clean");
const logger_1 = require("../common/logger");
const common_1 = require("../common");
const compile_js_1 = require("../compiler/compile-js");
const compile_style_1 = require("../compiler/compile-style");
async function compileFile(filePath) {
    if (common_1.isScript(filePath)) {
        return compile_js_1.compileJs(filePath);
    }
    if (common_1.isStyle(filePath)) {
        return compile_style_1.compileStyle(filePath);
    }
    return fs_extra_1.remove(filePath);
}
async function compileDir(dir) {
    const files = fs_extra_1.readdirSync(dir);
    await Promise.all(files.map(filename => {
        const filePath = path_1.join(dir, filename);
        // if (isDemoDir(filePath) || isTestDir(filePath)) {
        //   return remove(filePath);
        // }
        if (common_1.isDir(filePath)) {
            return compileDir(filePath);
        }
        return compileFile(filePath);
    }));
}
async function buildEs() {
    common_1.setModuleEnv('esmodule');
    console.log(constant_1.SRC_DIR)
    await fs_extra_1.copy(constant_1.SRC_DIR, constant_1.ES_DIR);
    await compileDir(constant_1.ES_DIR);
}
const tasks = [
    {
        text: 'Build ESModule Outputs',
        task: buildEs,
    },
    {
        text: 'Build Commonjs Outputs',
        task: buildLib,
    },
];
async function buildLib() {
    common_1.setModuleEnv('commonjs');
    await fs_extra_1.copy(constant_1.SRC_DIR, constant_1.LIB_DIR);
    await compileDir(constant_1.LIB_DIR);
}
async function runBuildTasks() {
    for (let i = 0; i < tasks.length; i++) {
        const { task, text } = tasks[i];
        const spinner = logger_1.ora(text).start();
        try {
            /* eslint-disable no-await-in-loop */
            await task();
            spinner.succeed(text);
        }
        catch (err) {
            spinner.fail(text);
            console.log(err);
            throw err;
        }
    }
    logger_1.consola.success('Compile successfully');
}
// function watchFileChange() {
//   consola.info('\nWatching file changes...');
//
//   chokidar.watch(SRC_DIR).on('change', async path => {
//     if (isDemoDir(path) || isTestDir(path)) {
//       return;
//     }
//
//     const spinner = ora('File changed, start compilation...').start();
//     const esPath = path.replace(SRC_DIR, ES_DIR);
//     const libPath = path.replace(SRC_DIR, LIB_DIR);
//
//     try {
//       await copy(path, esPath);
//       await copy(path, libPath);
//       await compileFile(esPath);
//       await compileFile(libPath);
//       await genStyleDepsMap();
//       genComponentStyle({cache: false});
//       spinner.succeed('Compiled: ' + slimPath(path));
//     } catch (err) {
//       spinner.fail('Compile failed: ' + path);
//       console.log(err);
//     }
//   });
// }
async function build() {
    // cmd: { watch?: boolean } = {}
    common_1.setNodeEnv('production');
    try {
        await clean_1.clean();
        // await installDependencies();
        await runBuildTasks();
        // if (cmd.watch) {
        //   watchFileChange();
        // }
    }
    catch (err) {
        logger_1.consola.error('Build failed');
        process.exit(1);
    }
}

exports.build = build;
