import { existsSync } from 'fs-extra';
import { join, dirname } from 'path';

function findRootDir(dir: string): string {
  if (dir === '/') {
    return '/';
  }

  if (existsSync(join(dir, 'vant.config.js'))) {
    return dir;
  }

  return findRootDir(dirname(dir));
}

// Root paths
export const CWD = process.cwd();
export const ROOT = findRootDir(CWD);
export const ES_DIR = join(ROOT, 'es');
export const LIB_DIR = join(ROOT, 'lib');
export const DOCS_DIR = join(ROOT, 'docs');
export const PACKAGE_JSON_FILE = join(ROOT, 'package.json');
export const ROOT_WEBPACK_CONFIG_FILE = join(ROOT, 'webpack.config.js');
export const ROOT_POSTCSS_CONFIG_FILE = join(ROOT, 'postcss.config.js');

// Relative paths
export const DIST_DIR = join(__dirname, '../../dist');
export const CONFIG_DIR = join(__dirname, '../config');

export const POSTCSS_CONFIG_FILE = join(CONFIG_DIR, 'postcss.config.js');

export const SRC_DIR = join(ROOT, 'src');
export const STYLE_DIR = join(SRC_DIR, 'style');

