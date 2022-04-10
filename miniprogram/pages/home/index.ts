// pages/about/about.ts
import {API_DOMAIN} from '../../constants/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 文章信息
    articleData: {
      total: 0,
      pageCount: 1,
      pageSize: 10,
      data: []
    },
    // 搜索框内容
    searchValue: '',
    // 轮播信息
    swiperList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 获取文章列表
    let that = this;
    wx.request({
      url: `${API_DOMAIN}posts.json`,
      success(res) {
            const {data, pageCount, pageSize, total} = res.data;
            that.setData({
                articleData: {
                    data,
                    pageCount,
                    pageSize,
                    total
                },
                swiperList: data.filter((i, index) => index <= 4),
                noticeContent: '公告信息'
            });
            console.log(data);
        }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onSearch(e: any) {
    this.setData({
      searchValue: e.detail
    });
},

  onCancelSearch() {
    this.setData({
      searchValue: ''
    });
  }
})