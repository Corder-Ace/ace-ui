const fs = require('fs');
const path = require('path');

const {externals} = require('./utis');
const autoprefixer = require('autoprefixer');
const postCssEnv = require('postcss-preset-env');
const postCssFlexbugFix = require('postcss-flexbugs-fixes');

const rootDir = path.resolve(__dirname, '../src/components');
const cModuleNames = fs.readdirSync(path.resolve(rootDir));
const cModuleMap = cModuleNames.reduce((prev, name) => {
  prev[name] = path.join(__dirname, `../src/components/${name}/index.tsx`);

  return prev;
}, {});
delete cModuleMap['.DS_Store']
delete cModuleMap['index.tsx']

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'none',
  entry: {
    index: path.resolve(__dirname, '../src/components/index.tsx'),
    ...cModuleMap
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name]/index.js',
    library: ['ace-components', '[name]'],
    libraryTarget: 'umd',
    publicPath: '/'
  },
  externals,
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postCssFlexbugFix,
                postCssEnv(autoprefixer({
                  browsers: [
                    '>1%',
                    'last 2 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                  flexbox: 'no-2009',
                }))],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/style/index.css', // 这种文件路径格式是为了方便 babel-plugin-import 进行按需加载
    })
  ]
}
