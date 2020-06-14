import {
  lstatSync,
  existsSync,
} from 'fs-extra';
import {
  ROOT_POSTCSS_CONFIG_FILE,
} from './constant';

export const EXT_REGEXP = /\.\w+$/;
export const STYLE_REGEXP = /\.(css|less|scss)$/;
export const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;
export const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue'];

export function getPostcssConfig(): object {
  if (existsSync(ROOT_POSTCSS_CONFIG_FILE)) {
    return require(ROOT_POSTCSS_CONFIG_FILE);
  }

  return {};
}

export type ModuleEnv = 'esmodule' | 'commonjs';
export type NodeEnv = 'production' | 'development' | 'test';
export type BuildTarget = 'site' | 'package';

export function setModuleEnv(value: ModuleEnv) {
  process.env.BABEL_MODULE = value;
}

export function setNodeEnv(value: NodeEnv) {
  process.env.NODE_ENV = value;
}

export function setBuildTarget(value: BuildTarget) {
  process.env.BUILD_TARGET = value;
}

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export function isDir(dir: string) {
  return lstatSync(dir).isDirectory();
}

export function isStyle(path: string) {
  return STYLE_REGEXP.test(path);
}

export function isScript(path: string) {
  return SCRIPT_REGEXP.test(path);
}

export function replaceExt(path: string, ext: string) {
  return path.replace(EXT_REGEXP, ext);
}
