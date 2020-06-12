"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceCssImport = exports.CSS_LANG = void 0;
const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
exports.CSS_LANG = 'scss';
function replaceCssImport(code) {
    return code.replace(IMPORT_STYLE_RE, str => str.replace(`.${exports.CSS_LANG}`, '.css'));
}
exports.replaceCssImport = replaceCssImport;
