const pkg = require('../package.json');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../src/components');
const cModuleNames = fs.readdirSync(path.resolve(rootDir));
const cModuleMap = cModuleNames.reduce((prev, name) => {
  prev[name] = path.join(__dirname, `../src/components/${name}/index.tsx`);

  return prev;
}, {});
delete cModuleMap['.DS_Store']
delete cModuleMap['index.tsx']
module.exports = {
  externals: Object.keys(pkg.dependencies).concat(['components']).map(pkgName => (context, request, callback) => {
    request.indexOf(pkgName) === 0 ? callback(null, request) : callback();
  }).concat(Object.keys(cModuleMap).map(pkgName => (context, request, callback) => {
    request.indexOf(`../${pkgName}`) === 0 ? callback(null, request) : callback();
  })),
}
