// pages/wxml_test03/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorList: [],
    isLoading: false,
    pagenum: 1,
    pagesize: 10,
    total: 50
  },

  getColors: function () {
    return Math.floor(Math.random() * 255)
  },

  getColorList: function () {
    const arr = []
    for (let i = 0; i < 10; i++) {
      arr[i] = { id: i, color: [this.getColors(), this.getColors(), this.getColors()] }
    }
    return arr;
  },

  getColorListByPage: function () {
    this.setData({
      isLoading: true
    })
    wx.showLoading({
      title: '加载中...',
    })
    new Promise((resolve) => {
      setTimeout(() => {
        const arr = this.getColorList();
        this.setData({
          colorList: [...this.data.colorList, ...arr]
        })
        resolve()
      }, 300)
    }).finally(() => {
      this.setData({
        isLoading: false
      })
      wx.hideLoading({
        success: (res) => { },
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getColorListByPage();
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
    if(this.data.pagenum * this.data.pagesize >= this.data.total){
      return wx.showToast({
        title: '没有下一页了...',
        icon: 'none'
      })
    }
    if (!this.data.isLoading) {
      this.setData({
        pagenum: this.data.pagenum + 1
      })
      this.getColorListByPage()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})