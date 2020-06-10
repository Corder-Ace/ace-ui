export default {
  pages: [
    'pages/site/index',
    'pages/my/index'
  ],
  tabBar: {
    color: "#111111",
    selectedColor: "#111111",
    borderStyle: "white",
    backgroundColor: "#fff",
    list: [
      {
        "selectedIconPath": "assets/images/home-active.png",
        "iconPath": "assets/images/home.png",
        "pagePath": "pages/site/index",
        "text": "首页"
      },
      {
        "selectedIconPath": "assets/images/my-active.png",
        "iconPath": "assets/images/my.png",
        "pagePath": "pages/my/index",
        "text": "我的"
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '红布林',
    navigationBarTextStyle: 'black',
  }
}
