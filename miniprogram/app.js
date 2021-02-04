//app.js
App({
    onLaunch: function (options) {
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
                env: 'develop-0gu7661dab121c02',
                traceUser: true,
            });

            wx.login({
                success(res) {
                }
            })

            let that = this;
            wx.getSetting({
                success(res) {
                    if (res.authSetting["scope.userInfo"]) {
                        wx.getUserInfo({
                            success(res) {
                                that.globalData.userInfo = res.userInfo;
                            }
                        })
                    }
                }
            })
        }

        // path: "" //页面路径
        // query: {} //页面的参数
        // referrerInfo: {} //来源小程序、公众号或 App 的 appId
        // scene: 1047 //场景值
        // shareTicket: //带 shareTicket 的转发可以获取到更多的转发信息，例如群聊的名称以及群的标识 openGId
        // console.log('打印小程序启动时的参数',options);

        this.globalData = {}
    }
})
