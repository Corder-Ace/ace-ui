import {join} from 'path';
import {remove, copy, readdirSync} from 'fs-extra';
import {SRC_DIR, LIB_DIR, ES_DIR} from '../common/constant';
import {clean} from './clean';
import {ora, consola} from '../common/logger';
import {
  isDir,
  isStyle,
  isScript,
  setNodeEnv,
  setModuleEnv,
} from '../common';
import {compileJs} from "../compiler/compile-js";
import {compileStyle} from "../compiler/compile-style";

async function compileFile(filePath: string) {
  if (isScript(filePath)) {
    return compileJs(filePath);
  }

  if (isStyle(filePath)) {
    return compileStyle(filePath);
  }

  return remove(filePath);
}

async function compileDir(dir: string) {
  const files = readdirSync(dir);

  await Promise.all(
    files.map(filename => {
      const filePath = join(dir, filename);

      // if (isDemoDir(filePath) || isTestDir(filePath)) {
      //   return remove(filePath);
      // }

      if (isDir(filePath)) {
        return compileDir(filePath);
      }

      return compileFile(filePath);
    })
  );
}

async function buildEs() {
  setModuleEnv('esmodule');
  await copy(SRC_DIR, ES_DIR);
  await compileDir(ES_DIR);
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
  // {
  //   text: 'Build Style Entry',
  //   task: buildStyleEntry,
  // },
  // {
  //   text: 'Build Package Entry',
  //   task: buildPacakgeEntry,
  // },
  // {
  //   text: 'Build Packed Outputs',
  //   task: buildPackages,
  // },
];

async function buildLib() {
  setModuleEnv('commonjs');
  await copy(SRC_DIR, LIB_DIR);
  await compileDir(LIB_DIR);
}

async function runBuildTasks() {
  for (let i = 0; i < tasks.length; i++) {
    const {task, text} = tasks[i];
    const spinner = ora(text).start();

    try {
      /* eslint-disable no-await-in-loop */
      await task();
      spinner.succeed(text);
    } catch (err) {
      spinner.fail(text);
      console.log(err);
      throw err;
    }
  }

  consola.success('Compile successfully');
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

export async function build() {
  // cmd: { watch?: boolean } = {}
  setNodeEnv('production');

  try {
    await clean();
    // await installDependencies();
    await runBuildTasks();

    // if (cmd.watch) {
    //   watchFileChange();
    // }
  } catch (err) {
    consola.error('Build failed');
    process.exit(1);
  }
}
