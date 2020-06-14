type CSS_LANG = 'css' | 'less' | 'scss';

const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

export const CSS_LANG = 'scss';

export function replaceCssImport(code: string) {
  return code.replace(IMPORT_STYLE_RE, str =>
    str.replace(`.${CSS_LANG}`, '.css')
  );
}
