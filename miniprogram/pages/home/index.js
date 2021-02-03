// pages/home/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
            'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
            'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
        ],
        interval: 5000,
        duration: 1000,
        indicatorDots: true,
        indicatorColor: "#ffffff",
        activecolor: "#2971f6",
        autoplay: true,
        musicinfo: {
            poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
            name: '此时此刻',
            author: '许巍',
            src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        },
        latitude: 22.540503,
        longitude: 113.934528,
        markers: [{
            id: 1,
            latitude: 22.540503,
            longitude: 113.934528,
            title: '深圳腾讯大厦'
        }],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: "正在加载中",
        });
        wx.request({
            url: 'https://news-at.zhihu.com/api/4/news/latest', //知乎日报最新话题
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log('网络请求成功之后获取到的数据',res)
                console.log('知乎日报最新话题',res.data)
            }
        })
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
        wx.hideLoading({
            success: (res) => {
                console.log("加载完成，所以隐藏掉了")
            },
        })
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
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '云开发技术训练营',
            path: "pages/home/home",
            imageUrl: "https://hackwork.oss-cn-shanghai.aliyuncs.com/lesson/weapp/4/weapp.jpg",
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    /**
     * 当前是 tab 页时，点击 tab 时触发
     */
    onTabItemTap: function (tab) {
        console.log(tab, '切换tab');
    }
})
