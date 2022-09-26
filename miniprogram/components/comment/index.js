import { ApiBaseUrl } from '../../config/api'
import { STORAGE_KEY, DEFAULT_VALUE, HALO_OPTION_KEY } from '../../services/const-data/const-data'
import { THEME_SETTING_KEY } from '../../services/const-data/theme-setting-key'

const app = getApp()
Component({
  data: {
    ApiBaseUrl,
    noContentImage: '',
    mpHtmlStyle: {},
    gravatarSource: DEFAULT_VALUE.gravatarSource,
    gravatarDefault: DEFAULT_VALUE.gravatarDefault
  },
  properties: {
    comments: {
      type: Array,
      value: []
    }
  },
  options: {
    addGlobalClass: true
  },
  lifetimes: {
    async attached() {
      if (!app.globalData.hasInit) {
        await app.init()
      }
      const options = wx.getStorageSync(STORAGE_KEY.options)
      let gravatarSource = options[HALO_OPTION_KEY.gravatarSource]
      if (!gravatarSource) {
        gravatarSource = DEFAULT_VALUE.gravatarSource
      }
      let gravatarDefault = options[HALO_OPTION_KEY.gravatarDefault]
      if (!gravatarDefault) {
        gravatarDefault = DEFAULT_VALUE.gravatarDefault
      }
      const mpHtmlStyle = {
        commentTagStyle: app.themeSettings[THEME_SETTING_KEY.COMMENT_TAG_STYLE],
        commentContainerStyle: app.themeSettings[THEME_SETTING_KEY.COMMENT_CONTAINER_STYLE],
        loadingImage: app.themeSettings[THEME_SETTING_KEY.PLACEHOLDER_IMAGE],
        errorImage: app.themeSettings[THEME_SETTING_KEY.LOAD_ERROR_IMAGE]
      }
      this.setData({
        mpHtmlStyle: mpHtmlStyle,
        gravatarSource: gravatarSource,
        gravatarDefault: gravatarDefault,
        noContentImage: app.themeSettings[THEME_SETTING_KEY.NO_CONTENT_IMAGE]
      })
    }
  },
  methods: {
    addComment(e) {
      // todo 不能留言
      wx.showToast({
        title: '啊哦,不能留言',
        duration: 1200,
        mask: true,
        image: '/images/prompt/fail.svg'
      })
      return;
      const detail = {
        modalName: e.currentTarget.dataset.target,
        commmentPid: e.currentTarget.dataset.pid,
        commmentPname: e.currentTarget.dataset.pname
      }
      this.triggerEvent('addComment', detail)
    },
    binderrorimg: function (e) {
      const errorImgIndex = e.target.dataset.errorimg
      const errorChildrenImgIndex = e.target.dataset.errorchildrenimg
      const comments = this.data.comments
      const gravatarMd5 = e.target.dataset.gravatarmd5
      const comment = comments[errorImgIndex]
      if (errorChildrenImgIndex || errorChildrenImgIndex === 0) {
        const childrenComment = comment.children[errorChildrenImgIndex]
        childrenComment.authorUrl = this.data.gravatarSource + gravatarMd5 + '?s=32&d=' + this.data.gravatarDefault
        comment.children[errorChildrenImgIndex] = childrenComment
      } else {
        comment.authorUrl = this.data.gravatarSource + gravatarMd5 + '?s=64&d=' + this.data.gravatarDefault
      }
      comments[errorImgIndex] = comment
      this.setData({
        comments: comments
      })
    }
  }
})
