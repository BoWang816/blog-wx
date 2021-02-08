// components/tabbar/index.js
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
        current: 'homepage',
        menuData: [
            {
                key: 'homepage',
                title: '首页'
            },
            {
                key: 'label',
                title: '标签'
            },
            {
                key: 'time',
                title: '时间轴'
            },
            {
                key: 'mine',
                title: '关于'
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleChange: function({ detail }) {
            this.setData({
                current: detail.key
            });
        },
    }
})
