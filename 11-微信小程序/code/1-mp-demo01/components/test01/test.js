// components/test01/test.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    max: {
      type: Number,
      value: 10
    },
    min: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addCount() {
      if (this.data.count >= this.properties.max) {
        return;
      }
      this.setData({
        count: this.data.count + 1
      })
      this._showCount()
    },
    _showCount() {
      wx.showToast({
        title: 'count的值：' + this.data.count,
        icon: "none"
      })
    }
  },
  // options: {
  //   styleIsolation: "apply-shared"
  // }
})
