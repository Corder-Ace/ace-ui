"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceExt = exports.isScript = exports.isStyle = exports.isDir = exports.isDev = exports.setBuildTarget = exports.setNodeEnv = exports.setModuleEnv = exports.getPostcssConfig = exports.ENTRY_EXTS = exports.SCRIPT_REGEXP = exports.STYLE_REGEXP = exports.EXT_REGEXP = void 0;
const fs_extra_1 = require("fs-extra");
const constant_1 = require("./constant");
exports.EXT_REGEXP = /\.\w+$/;
exports.STYLE_REGEXP = /\.(css|less|scss)$/;
exports.SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;
exports.ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue'];
function getPostcssConfig() {
    if (fs_extra_1.existsSync(constant_1.ROOT_POSTCSS_CONFIG_FILE)) {
        return require(constant_1.ROOT_POSTCSS_CONFIG_FILE);
    }
    return {};
}
exports.getPostcssConfig = getPostcssConfig;
function setModuleEnv(value) {
    process.env.BABEL_MODULE = value;
}
exports.setModuleEnv = setModuleEnv;
function setNodeEnv(value) {
    process.env.NODE_ENV = value;
}
exports.setNodeEnv = setNodeEnv;
function setBuildTarget(value) {
    process.env.BUILD_TARGET = value;
}
exports.setBuildTarget = setBuildTarget;
function isDev() {
    return process.env.NODE_ENV === 'development';
}
exports.isDev = isDev;
function isDir(dir) {
    return fs_extra_1.lstatSync(dir).isDirectory();
}
exports.isDir = isDir;
function isStyle(path) {
    return exports.STYLE_REGEXP.test(path);
}
exports.isStyle = isStyle;
function isScript(path) {
    return exports.SCRIPT_REGEXP.test(path);
}
exports.isScript = isScript;
function replaceExt(path, ext) {
    return path.replace(exports.EXT_REGEXP, ext);
}
exports.replaceExt = replaceExt;
