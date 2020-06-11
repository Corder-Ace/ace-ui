const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  projectName: 'taro@next',
  date: '2020-5-28',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {},
  h5: {
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true
      }
    }
  },
  alias: {
    '@/info': path.resolve(__dirname, '..', 'src/info'),
    '@/hoc': path.resolve(__dirname, '..', 'src/hoc'),
    '@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@/api': path.resolve(__dirname, '..', 'src/api'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/business': path.resolve(__dirname, '..', 'src/business'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/package': path.resolve(__dirname, '..', 'package.json'),
    '@/project': path.resolve(__dirname, '..', 'project.config.json'),
    '@scss': path.resolve(__dirname, '..', 'src/styles'),
  }
}
const isBuildComponent = process.env.TARO_BUILD_TYPE === 'component'

if (isBuildComponent) {
  Object.assign(config.h5, {
    enableSourceMap: false,
    enableExtract: false,
    enableDll: false
  })
  config.h5.webpackChain = chain => {
    chain.plugins.delete('htmlWebpackPlugin')
    chain.plugins.delete('addAssetHtmlWebpackPlugin')
    chain.merge({
      output: {
        path: path.join(process.cwd(), 'dist', 'h5'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'ace-ui'
      },
      externals: {
        nervjs: 'commonjs2 nervjs',
        classnames: 'commonjs2 classnames',
        '@tarojs/components': 'commonjs2 @tarojs/components',
        '@tarojs/taro-h5': 'commonjs2 @tarojs/taro-h5',
        'weui': 'commonjs2 weui'
      },
      plugin: {
        extractCSS: {
          plugin: MiniCssExtractPlugin,
          args: [{
            filename: 'css/index.css',
            chunkFilename: 'css/[id].css'
          }]
        }
      }
    })
  }
}
module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
