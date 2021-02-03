// pages/tag/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids:[
      { 
        imgurl:"https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon1.png",
        title:"招聘"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon2.png",
        title: "房产"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon3.png",
        title: "二手车新车"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon4.png",
        title: "二手"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon5.png",
        title: "招商加盟"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon6.png",
        title: "兼职"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon7.png",
        title: "本地"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon8.png",
        title: "家政"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon9.png",
        title: "金币夺宝"
      },
      {
        imgurl: "https://hackweek.oss-cn-shanghai.aliyuncs.com/hw18/hackwork/weapp/icon10.png",
        title: "送现金"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取网络类型
    wx.getNetworkType({
      success(res) {
        console.log(res)
      }
    });
    // 获取设备信息
    wx.getSystemInfo({
      success (res) {
        console.log("设备的所有信息",res)
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }
    })
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