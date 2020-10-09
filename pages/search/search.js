var app = getApp();
const API = require('../../utils/api.js').API;

Page({
  data: {
    inputValue: null, //输入框输入的值
    hotsongs: [], //获取热门搜索
    history: [], //搜索历史存放数组
    // searchsuggest:[], //搜索建议
    showView: true, //控制热门搜索 搜索历史和搜索结果组件的显示与隐藏
    // showsongresult:true,
    searchresult: [], //搜索结果
    searchKey: [], //搜索关键字
    videoresult: [], //搜索到的视频结果
    singerresult: [], //搜索到的歌手结果
    albumresult: [], //搜索到的专辑结果
    sheetresult: [], //搜索到的对应歌单
    userresult: [], //搜索到的用户

    winHeight: "", //窗口高度
    currentTab: 0, //预设当前tab项的值
    scrollLeft: 0, //tab标题的滚动条位置
    type: 1, //搜索内容对应类型 默认为单曲
    sheetCategory: [{
        text: '综合',
        type: 1018,
      },
      {
        text: '单曲',
        type: 1,
      },
      {
        text: '云村',
        type: 1
      },
      {
        text: '视频',
        type: 1014
      },
      {
        text: '歌手',
        type: 100
      },
      {
        text: '专辑',
        type: 10
      },
      {
        text: '歌单',
        type: 1000
      },
      {
        text: '主播电台',
        type: 1009
      },
      {
        text: '用户',
        type: 1002
      }
    ],
    sheetlist: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  },


  onLoad: function () {
    var that = this;
    // 高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 100;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    wx.showLoading({
      title: '加载中...',
    })
    this.getHotSongs(); //加载页面完成调用gethotsongs方法

    // this.getCategory(),
    // this.getHighquality(),
  },

  // 左右滑动切换标签
  switchTab: function (e) {
    // console.log(e.detail.current);
    this.setData({
      currentTab: e.detail.current
    });
    var type = this.data.sheetCategory[e.detail.current].type;
    // console.log(type);
    wx.showLoading({
      title: '加载中...',
    })
    // 切换tab时请求对应类型的搜索结果
    this.doSearch(type)
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
  
  // 从接口获取热门搜索关键字
  getHotSongs() {
    API.getHotSongs({
      type: 'new'
    }).then(res => {
      // console.log(res)
      wx.hideLoading()
      if (res.data.code === 200) { 
        this.setData({
          hotsongs: res.data.result.hots
        })
      }
    })
  },

  // input失去焦点函数
  handleBlur: function (e) {
    // console.log(e.detail.value)
    // 本地存储wx.getStorageSync 搜索历史
    let history = wx.getStorageSync("history") || [];
    // console.log(this.data.searchKey)
    history.push(this.data.searchKey)
    // console.log(history)
    wx.setStorageSync("history", history);
  },

  // 清空搜索历史 重置缓存为[]
  clearHistory: function () {
    const that = this;
    wx.showModal({
      content: '确认清空全部历史记录',
      cancelColor: '#31c27c',
      confirmColor: '#31c27c',
      success(res) {
        if (res.confirm) {
          that.setData({
            history: []
          })
          wx.setStorageSync("history", []) //把空数组给history,即清空历史记录
        } else if (res.cancel) {}
      }
    })
  },

  // 实现点击输入框的×把输入的内容清空
  clearInput: function (res) {
    this.setData({
      inputValue: ''
    })
  },

  //实现取消功能，停止搜索，返回首页
  cancel: function () {
    wx.switchTab({
      url: '/pages/music/music'
    })
  },

  //获取input文本并且实时搜索,动态隐藏组件
  getsearchKey: function (e) {
    //获取输入的关键字
    var keywords = e.detail.value;
    // console.log(keywords) //打印出输入框的值
    let _this = this;
    // if (e.detail.cursor != _this.data.cursor) { //实时获取输入框的值
      _this.setData({
        searchKey: keywords
      })
    // }
    if (e.detail.value != "") { //控制热门搜索和搜索历史组件的显示与隐藏
      _this.setData({
        showView: false
      })
    } else {
      _this.setData({
        showView: true
      })
    }
  },

  //搜索关键字输入完 点击键盘enter搜索
  searchover: function () {
    let _this = this;
    // console.log(_this.data.type)
    wx.showLoading({
      title: '加载中...',
    })
    _this.doSearch(_this.data.type);
  },

  // 获取搜索结果
  doSearch(type) {
    // console.log(type)
    //  console.log(this.data.searchKey)
    API.getSearchResult({
      keywords: this.data.searchKey,
      type: type,
      limit: 100,
      offset: 2
    }).then(res => {
      wx.hideLoading();
      // console.log(res)
      if (res.data.code === 200) {
        if (type == 1) {
        //设置搜索到的单曲相关结果
          this.setData({
            searchresult: res.data.result.songs
          })
        } else if (type == 1014) {
               //设置搜索到的视频相关结果
          this.setData({
            videoresult: res.data.result.videos
          })
        } else if (type == 100) {
         //设置搜索到的歌手相关结果
          this.setData({
            singerresult: res.data.result.artists
          })
        } else if (type == 10) {
         //设置搜索到的专辑相关结果
          this.setData({
            albumresult: res.data.result.albums
          })
        } else if (type == 1000) {
            //设置搜索到的歌单相关结果
          this.setData({
            sheetresult: res.data.result.playlists
          })
        } else if (type == 1002) {
            //设置搜索到的用户相关结果
          this.setData({
            userresult: res.data.result.userprofiles
          })
        } else {
          this.setData({
            searchresult: res.data.result.songs
          })
        }
      }
    })
  },

  //播放音频
  PlayAudio: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({ //获取到id带着完整url后跳转到play页面
      url: `../play_music/play_music?id=${audioId}`
    })
  },

  // 点击热门搜索值或搜索历史，将值填入搜索框
  fill_value: function (e) {
    let _this = this;
    _this.setData({
      searchKey: e.currentTarget.dataset.value, //点击把值给searchKey,让他去搜索
      inputValue: e.currentTarget.dataset.value, //在输入框显示内容
      showView: false, //给false值，隐藏 热搜和历史 界面
    })
    // console.log(_this.data.type)
    wx.showLoading({
      title: '加载中...',
    })
    _this.doSearch(_this.data.type); //执行搜索功能
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      history: wx.getStorageSync("history") || []
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("到底部了")
  },
})