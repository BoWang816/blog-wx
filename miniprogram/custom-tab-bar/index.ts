// customer-tab-bar/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    list: [{
      "pagePath": "/pages/home/index",
      "text": "首页",
      "icon": "wap-home-o"
    },
    {
      "pagePath": "/pages/ranking/index",
      "text": "排行",
      "icon": "chart-trending-o"
    },
    {
      "pagePath": "/pages/classify/index",
      "text": "分类",
      "icon": "bookmark-o"
    },
    {
      "pagePath": "/pages/about/index",
      "text": "关于",
      "icon": "user-o"
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init() {
      const page = getCurrentPages().pop();
      this.setData({
        // @ts-ignore
        active: this.data.list.findIndex(item => item.pagePath === `/${page.route}`)
      });
    },

    onChange(e: any) {
      wx.switchTab({
        url: this.data.list[e.detail].pagePath
      });
      this.setData({
        active: e.detail
      });
    }
  }
})
