import { getArticleDetails, doPraise, getTopComments } from '../../services/api/content/article'
import apiResult from '../../utils/api-result'
import { ApiBaseUrl } from '../../config/api'
import LastMayday from '../../services/posters/article/base'
import { STORAGE_KEY, COMMENT_TYPE } from '../../services/const-data/const-data'
import { convertImageUrl } from '../../utils/utils'
import { THEME_SETTING_KEY } from '../../services/const-data/theme-setting-key'

const app = getApp()
Page({
  data: {
    ApiBaseUrl,
    noContentImage: '',
    shareIsOpen: false,
    mpHtmlStyle: {
      tagStyle: '',
      containerStyle: '',
      loadingImage: '',
      errorImage: ''
    },
    modalShare: false,
    logo: '',
    // 是否显示回到顶端图标
    floorstatus: false,
    // 点赞数
    loveCount: 0,
    articleDetails: {
      // 评论数
      commentCount: 0,
      wordCount: 0,
      visits: 0,
      // 文章标签
      tags: [],
      topPriority: false,
      disallowComment: false,
      createTime: 0
    },

    userInfo: {},
    checkStatus: true, // 评论开关
    comments: [],
    // 海报相关
    visible: false,
    imgsInfo: {},
    scene: '',
    notifiStatus: false
  },
  /**
   * 分享
   */
  async share(event) {
    const that = this
    that.setData({
      modalShare: true
    })
  },
  /**
   * 取消分享
   */
  async hideModalshare(event) {
    const that = this
    that.setData({
      modalShare: false
    })
  },
  /**
   * 分享
   * @param {*} res
   */
  onShareAppMessage: function (res) {
    return {
      title: this.data.articleDetails.title,
      imageUrl: convertImageUrl(this.data.articleDetails.thumbnail, [app.themeSettings[THEME_SETTING_KEY.BLOG_LOGO]]),
      path: '/pages/details/index?id=' + this.data.id
    }
  },
  onShareTimeline: function (res) {
    return {
      title: this.data.articleDetails.title,
      imageUrl: convertImageUrl(this.data.articleDetails.thumbnail, [app.themeSettings[THEME_SETTING_KEY.BLOG_LOGO]]),
      query: 'id=' + this.data.id
    }
  },
  async onLoad(options) {
    if (!app.globalData.hasInit) {
      await app.init()
    }
    let id = 0
    // 扫码打开
    if (options.scene && !options.id) {
      const scene = decodeURIComponent(options.scene)
      const param = this.parseQuery(scene)
      id = param.id
    } else {
      id = options.id
    }
    const mpHtmlStyle = {
      tagStyle: app.themeSettings[THEME_SETTING_KEY.POST_TAG_STYLE],
      containerStyle: app.themeSettings[THEME_SETTING_KEY.POST_CONTAINER_STYLE],
      loadingImage: app.themeSettings[THEME_SETTING_KEY.PLACEHOLDER_IMAGE],
      errorImage: app.themeSettings[THEME_SETTING_KEY.LOAD_ERROR_IMAGE]
    }
    this.setData({
      mpHtmlStyle: mpHtmlStyle,
      noContentImage: app.themeSettings[THEME_SETTING_KEY.NO_CONTENT_IMAGE],
      logo: app.themeSettings[THEME_SETTING_KEY.BLOG_LOGO],
      shareIsOpen:
        app.themeSettings[THEME_SETTING_KEY.CLOUD_IS_OPEN] && app.themeSettings[THEME_SETTING_KEY.CLOUD_SHARE_OPEN],
      loadModal: true,
      scene: 'id=' + id,
      id: id
    })

    const that = this
    const articleDetails = await this.getArticleDetails(id)
    const html = articleDetails.content
    that.setData({
      articleDetails: articleDetails,
      disallowComment: articleDetails.disallowComment,
      content: html,
      loveCount: articleDetails.likes
    })
    this.setData({
      loadModal: false
    })
  },
  async onShow() {
    const that = this
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    that.setData({
      currentPage: currentPage
    })
    const comments = await this.getComments(that.data.id)
    that.setData({
      comments: comments
    })
  },
  /**
   * 上滑刷新
   */
  onPullDownRefresh() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading()
    this.onLoad()
    setTimeout(function () {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading()
      // 停止当前页面下拉刷新。
      wx.stopPullDownRefresh()
    }, 1000)
  },
  /**
   * 获取文章详情
   */
  async getArticleDetails(id) {
    try {
      const param = {
        formatDisabled: false
      }
      const result = await getArticleDetails(id, param)
      return result
    } catch (error) {
      return await Promise.reject(error)
    }
  },
  /**
   * 跳转海报页
   */
  toSharePage(event) {
    wx.hideLoading()
    wx.navigateTo({
      url: '/pages/share/index',
      success: res => {
        res.eventChannel.emit('shareImage', {
          shareImage: event.detail.path,
          id: this.data.id
        })
      }
    })
  },
  // 分享海报
  shareFriends() {
    const that = this
    that.setData({
      modalShare: false
    })
    // 需要用户登陆
    const userInfo = wx.getStorageSync(STORAGE_KEY.user)
    if (!userInfo.nickName) {
      that.setData({
        modalName: 'loginModal'
      })
      return false
    }
    wx.showLoading({
      title: '生成中'
    })
    wx.cloud.callFunction({
      name: 'get_qrcode',
      data: {
        scene: that.data.scene,
        path: that.data.currentPage.route
      },
      success(res) {
        const filePath = wx.env.USER_DATA_PATH + '/' + Date.parse(new Date()) + '_buffer2file.jpg'
        const fileManager = wx.getFileSystemManager()
        fileManager.writeFile({
          filePath: filePath,
          encoding: 'binary',
          data: res.result.buffer,
          success(res) {
            const palette = new LastMayday().palette(
              app.themeSettings[THEME_SETTING_KEY.BLOG_TITLE],
              userInfo.nickName,
              userInfo.avatarUrl,
              '/images/bg/background-share.png',
              that.data.articleDetails.title,
              that.data.articleDetails.summary,
              filePath
            )
            that.setData({
              palette: palette
            })
          },
          fail(err) {
            console.log(err)
          }
        })
      }
    })
  },

  // 关闭海报展示
  close() {
    this.setData({
      visible: false
    })
  },

  /**
   * 点赞执行
   */
  async doPraise(postId) {
    try {
      const param = {}
      const result = await doPraise(postId, param)
      return result
    } catch (error) {
      return error.message
    }
  },
  /**
   * 点赞结果
   */
  async addStar(event) {
    const that = this
    const count = event.currentTarget.dataset.lovecount
    const postId = event.currentTarget.dataset.gid
    const result = await this.doPraise(postId)
    if (result == null) {
      // 点赞数加一以界面不刷新显示
      that.setData({
        loveCount: count + 1
      })
      this.setData({
        msgFlag: true,
        msgData: '点赞成功'
      })
      setTimeout(() => {
        this.setData({
          msgFlag: false
        })
      }, 1000)
    }
  },
  addCommentByComponent(e) {
    // todo 不能评论
    wx.showToast({
      title: '啊哦,不能评论',
      duration: 1200,
      mask: true,
      image: '/images/prompt/fail.svg'
    })
    return;

    this.selectComponent('#commentComponent').addComment(e)
  },
  /**
   * 评论
   */
  addComment(e) {
    // 判断该文章评论功能是否关闭
    if (this.data.disallowComment) {
      apiResult.warn('评论已关闭')
      return
    }
    const userInfo = wx.getStorageSync(STORAGE_KEY.user)
    if (!userInfo.nickName) {
      this.setData({
        modalName: 'loginModal'
      })
    } else {
      wx.navigateTo({
        url:
          '/pages/comment/publish/index?id=' +
          this.data.id +
          '&commmentPid=' +
          e.detail.commmentPid +
          '&commmentPname=' +
          e.detail.commmentPname +
          '&type=' +
          COMMENT_TYPE.post
      })
    }
  },

  /**
   * 查询字符串转对象
   */
  parseQuery(query) {
    const reg = /([^=&\s]+)[=\s]*([^&\s]*)/g
    const obj = {}
    while (reg.exec(query)) {
      obj[RegExp.$1] = RegExp.$2
    }
    return obj
  },

  /**
   * 获取文章评论
   */
  async getComments(postId) {
    try {
      const param = {
        page: 0,
        sort: 'createTime,desc'
      }
      const result = await getTopComments(postId, param)
      if (result.content.length > 2) {
        return result.content.slice(0, 2)
      }
      return result.content
    } catch (error) {
      return error.message
    }
  },
  /**
   * 点击上一篇
   */
  clickUp() {
    const that = this
    if (!this.data.upUrl) {
      that.setData({
        modalMsg: '已经是第一篇了'
      })
    } else {
      wx.redirectTo({
        url: this.data.upUrl
      })
    }
  },
  /**
   * 点击下一篇
   */
  clickDown() {
    const that = this
    if (!this.data.downUrl) {
      that.setData({
        modalMsg: '已经是最后一篇了'
      })
    } else {
      wx.redirectTo({
        url: this.data.downUrl
      })
    }
  },
  /**
   * 隐藏消息提示
   */
  hideMsg() {
    this.setData({
      modalMsg: ''
    })
  },

  /**
   * 滚动条位置判断，从而隐藏/显示回到顶端图标
   * @param {*} e
   */
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      })
    } else {
      this.setData({
        floorstatus: false
      })
    }
  },
  /**
   *
   */
  returnTop(e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      commentContent: '',
      modalName: null
    })
  },

  toTagPage(event) {
    wx.navigateTo({
      url: '../tag/index?id=' + event.currentTarget.dataset.id
    })
  },
  toCommentPage(event) {
    wx.navigateTo({
      url:
        '/pages/comment/home/index?id=' +
        event.currentTarget.dataset.id +
        '&disallowComment=' +
        this.data.disallowComment +
        '&type=' +
        COMMENT_TYPE.post
    })
  }
})
