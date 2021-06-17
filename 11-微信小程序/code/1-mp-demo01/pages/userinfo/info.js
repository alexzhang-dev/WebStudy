// userinfo.js
Page({
  data: {
    username: '',
  },
  // onLoad 接收导航参数
  onLoad: function (options) {
    this.setData({
      username: options.username
    })
  },
  // onReady 更改页面标题
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.username
    })
  }
})