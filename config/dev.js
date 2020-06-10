module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    devServer:{
      host: 'localhost',
      port: 10086,
      proxy: {
        '/': {
          // target: "https://app.aplum.com",
          // target: "https://app-test.aplum.com",
          target: "http://android.aplum.com:8090/",
          // target:'https://android.aplum.com:8092/',
          // target: 'https://app-test.aplum.com',
          // target: 'http://app.dev02.aplum-inc.com:8529',
          changeOrigin: true,
        },
        //  serve命令下登录使用，输入启动时的域名+端口号+'/site/login'
        //  target指向的域名需要和'/'代理指向的接口域名一致
        //  浏览器会自动跳转到下方 target 指向的域名，并存入登录cookie
        //  点击浏览器返回，刷新浏览器自动登录
        '/site/login': {
          // target: "https://app-test.aplum.com",
          target: "https://android.aplum.com:8090/",
          // target: 'http://app.dev02.aplum-inc.com:8529',
          changeOrigin: true
        }
      }
    }
  }
}
