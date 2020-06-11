// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  sourceMap: true,
  presets: [
    ['taro', {
      framework: 'react',
      ts: true,
    }]
  ],
  'plugins': [
    ["import",{
      'libraryName': 'ace',
      'camel2DashComponentName': false,
      'customName': name => `../${name}`, // 这里的customName可以是一个函数，定义如何转化文件路径
      'style': true,
    }]
  ]
}
