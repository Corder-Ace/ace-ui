"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STYLE_DIR = exports.SRC_DIR = exports.POSTCSS_CONFIG_FILE = exports.CONFIG_DIR = exports.DIST_DIR = exports.ROOT_POSTCSS_CONFIG_FILE = exports.ROOT_WEBPACK_CONFIG_FILE = exports.PACKAGE_JSON_FILE = exports.DOCS_DIR = exports.LIB_DIR = exports.ES_DIR = exports.ROOT = exports.CWD = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
function findRootDir(dir) {
    if (dir === '/') {
        return '/';
    }
    if (fs_extra_1.existsSync(path_1.join(dir, 'vant.config.js'))) {
        return dir;
    }
    return findRootDir(path_1.dirname(dir));
}
// Root paths
exports.CWD = process.cwd();
exports.ROOT = findRootDir(exports.CWD);
exports.ES_DIR = path_1.join(exports.ROOT, 'es');
exports.LIB_DIR = path_1.join(exports.ROOT, 'lib');
exports.DOCS_DIR = path_1.join(exports.ROOT, 'docs');
exports.PACKAGE_JSON_FILE = path_1.join(exports.ROOT, 'package.json');
exports.ROOT_WEBPACK_CONFIG_FILE = path_1.join(exports.ROOT, 'webpack.config.js');
exports.ROOT_POSTCSS_CONFIG_FILE = path_1.join(exports.ROOT, 'postcss.config.js');
// Relative paths
exports.DIST_DIR = path_1.join(__dirname, '../../dist');
exports.CONFIG_DIR = path_1.join(__dirname, '../config');
exports.POSTCSS_CONFIG_FILE = path_1.join(exports.CONFIG_DIR, 'postcss.config.js');
exports.SRC_DIR = path_1.join(exports.ROOT, 'src');
exports.STYLE_DIR = path_1.join(exports.SRC_DIR, 'style');
