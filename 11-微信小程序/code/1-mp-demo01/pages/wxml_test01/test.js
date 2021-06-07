// pages/wxml_test01/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 在 data 中定义数据
    info: "hello, WXML!",
    // 动态绑定属性
    imgURL: "../../images/1.jpg",
    // 三元表达式
    flag: true,
    // 算数运算
    num: 1,
    msg: '',
    inputMsg: '',
    gender: -1,
    userType: 0,
    list: [0, 1, 2, 88],
    userList: [
      { id: 1, userName: 'admin' },
      { id: 2, userName: 'alex' },
      { id: 3, userName: 'zs' },
      { id: 4, userName: 'andrew' },
    ]
  },
  handleTap() {
    // 使用 setData 来赋值
    this.setData({
      msg: 'hello world'
    })
  },
  handleTap2 (event) {
    // 需要用到 event.target.dataset.* 来获取到
    console.log(event.target.dataset.num)
  },
  handleInput(event) {
    // event.detail.value 是最新的输入框的值
    this.setData({
      inputMsg: event.detail.value
    })
  }
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})