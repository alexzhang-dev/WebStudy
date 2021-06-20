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
  options: {
    pureDataPattern: /^_/
  },
  lifetimes: {
    created: function() {
      wx.showToast({
        title: '组件创建完毕！',
        icon: 'none'
      })
    }
  },
  pageLifetimes: {
    show: function() {
      this.setData({
        r: this._randomNumber(),
        g: this._randomNumber(),
        b: this._randomNumber(),
        allColors: [this.data.r, this.data.g, this.data.b]
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0,
    r: 0,
    g: 0,
    b: 0,
    allColors: [0, 0, 0]
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
    },
    addRedValue() {
      this.setData({
        r: this.data.r + 1
      })
    },
    addGreenValue() {
      this.setData({
        g: this.data.g + 1
      })
    },
    addBlueValue() {
      this.setData({
        b: this.data.b + 1
      })
    },
    _randomNumber: function() {
      return Math.floor(Math.random()* (255 - 1 + 1) + 1)
    }
  },
  observers: {
    "r, g, b": function(r, g, b) {
      this.setData({
        allColors: [r, g, b]
      })
    }
  }
  // options: {
  //   styleIsolation: "apply-shared"
  // }
})
