var app = getApp();
const API = require('../../utils/api.js').API;

Page({
  data: {
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    type: "推荐", //歌单类型 默认为推荐
    sheetCategory: [ //tab栏显示的内容
      {
        text: '推荐'
      },
      {
        text: '官方'
      },
      {
        text: '精品'
      },
      {
        text: '韩语'
      },
      {
        text: '说唱'
      },
      {
        text: '民谣'
      },
      {
        text: 'R&B/Soul'
      },
      {
        text: '摇滚'
      }
    ],

    sheetlists: [{ //获取的对应歌单的内容
        resultlist: [],
        total: 0,
        limit: 12 //请求数据的数量 默认为12
      },
      {
        resultlist: [],
        total: 0,
        limit: 12
      },
      {
        resultlist: [],
        total: 0,
        limit: 12
      },
      {
        resultlist: [],
        total: 0,
        limit: 12
      },
      {
        resultlist: [],
        total: 0,
        limit: 12
      },
      {
        resultlist: [],
        total: 0,
        limit: 12
      },
      {
        resultlist: [],
        total: 0,
        limit: 12
      },
      {
        resultlist: [],
        total: 0,
        limit: 12
      },
    ]

  },

  onLoad: function () {
    var type = this.data.type;
    var that = this;
    // 高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 100;
        that.setData({
          winHeight: calc
        });
      }
    });
    wx.showLoading({
      title: '正在加载中...',
    })
    this.getSheets(type);
  },

  // 切换标签
  switchTab: function (e) {
    //切换tab页时获取到对应歌单的类型
    var type = this.data.sheetCategory[e.detail.current].text;
    this.setData({
      currentTab: e.detail.current,
      type: type
    });
    // console.log(type);
    wx.showLoading({
      title: '正在加载中...',
    })
    this.getSheets(type);
    this.checkCor();
  },

  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },

  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },

  //获取歌单
  getSheets(type) {
    // var currentTab =this.data.currentTab;
    // console.log("当tab对应得下标----"+currentTab) 
    if (type == "推荐") {
      this.getRecommendSheet();
    } else if (type == "精品") {
      this.getHighquality();
    } else {
      // console.log("其他类型")
      this.getSheet(type);
    }
  },

  //  获取除精品外某一类型得歌单
  getSheet: function (type) {
    var currentTab = this.data.currentTab;
    var limit = this.data.sheetlists[currentTab].limit;
    // console.log("当tab对应得下标----"+currentTab) 
    API.getSheet({
      limit: limit,
      cat: type
    }).then(res => {
      wx.hideLoading();
      console.log(res.data)
      this.setData({
        ['sheetlists[' + currentTab + '].resultlist']: res.data.playlists
      })
    })
  },

  // 获取精品类型的歌单
  getHighquality: function () {
    var currentTab = this.data.currentTab;
    var limit = this.data.sheetlists[currentTab].limit;
    // console.log("当tab对应得下标----"+currentTab + typeof(currentTab)) 
    API.getHighquality({
      limit: limit
    }).then(res => {
      wx.hideLoading();
      // console.log(res.data)
      var length = res.data.playlists.length;
      this.setData({
        ['sheetlists[' + currentTab + '].total']: length,
        ['sheetlists[' + currentTab + '].resultlist']: res.data.playlists
      })
    })
  },

  // 获取推荐歌单
  getRecommendSheet: function () {
    var currentTab = this.data.currentTab;
    var limit = this.data.sheetlists[currentTab].limit;
    // console.log("当tab对应得下标----"+currentTab +typeof(currentTab)) 
    API.getRecommendSheet({
      limit: limit
    }).then(res => {
      wx.hideLoading();
      console.log(res)
      var length = res.data.result.length;
      console.log(length);
      this.setData({
        ['sheetlists[' + currentTab + '].total']: length,
        ['sheetlists[' + currentTab + '].resultlist']: res.data.result,
      })
    })
  },

  //跳转到歌单详情页
  goSheetDetail: function (event) {
    // console.log(event)
    const sheetId = event.currentTarget.dataset.id; //获取到event里面的歌单id赋值给sheetId
    wx.navigateTo({
      url: `../sheet_detail/sheet_detail?id=${sheetId}`
    })
  },

  //加载跟多歌单
  loadMoreData: function () {
    // console.log("到达底部了");
    var currentTab = this.data.currentTab;
    var type = this.data.type;
    // console.log(type)
    wx.showLoading({
      title: '加载更多中',
    })
    var limit = this.data.sheetlists[currentTab].limit;
    //  console.log(limit);
    this.setData({
      ['sheetlists[' + currentTab + '].limit']: limit + 6
    })
    this.getSheets(type);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})