// pages/tag/index.js
import {API_DOMAIN} from '../../constants/index.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tags: [],
        categories: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;
        wx.request({
            url: `${API_DOMAIN}tags.json`,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({tags: res.data})
            }
        });
        wx.request({
            url: `${API_DOMAIN}categories.json`,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                that.setData({
                    categories: res.data
                });
            }
        })
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
            success(res) {
                console.log("设备的所有信息", res)
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
