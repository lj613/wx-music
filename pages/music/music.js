// pages/music/music.js

const API = require('../../utils/api.js').API;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      // background: ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg'],
      banners:[],  //轮播图
      indicatorDots: true,
      indicatorActiveColor:"#31c27c",
      vertical: false,
      autoplay: true,
      circular:true,
      interval: 2000,
      duration: 500,
      songsheet: [], //首页歌单列表前6
      newsong:[], //首页新歌列表前6
      newalbum:[], //首页新碟上架列表前6
      songImg:'' //歌曲封面
  },

  getBanner: function() {
    let _this = this;
    API.getBanner({
      type: 2
    }).then(res => {
      console.log(res)
        this.setData({
          banners: res.data.banners
        })
    })
  },
  // 获取新歌
  getNewSong: function() {
    let _this = this;
    API.getNewSong({
      type:0
    }).then(res => {
      // console.log(res.data)
        this.setData({
          newsong: res.data.result.slice(0, 6)
        })
    })
  },
  // 获取精选歌单
  getSongSheet: function() {
    API.getSongSheet({
      order: 'hot',
      limit:6
    }).then(res => {
        // console.log(res.data)
        // console.log(res.data.playlists)
        this.setData({
          songsheet: res.data.playlists,
          // songsheet_index: res.playlists.slice(0, 6)
        })
    })
  },
//  新碟上架
getNewAlbum: function() {
    let _this = this;
    API.getNewAlbum({
      type:'new',
      limit:6
    }).then(res => {
      console.log(res)
        this.setData({
          // newalbum:res.data.albums
          newalbum:res.data.monthData
        })
    })
  },
    // 跳转到每日推荐页面
    go_recommend:function(){
      wx.navigateTo({
        url: '../recommend/recommend',
      })
    },
  // 跳转到最新mv页面
  go_newMv:function(){
    wx.navigateTo({
      url: '../new_mv/new_mv',
    })
  },
    // 跳转到最新私人fm页面
    go_fm:function(){
      wx.navigateTo({
        url: '../fm/fm',
      })
    },
  // 跳转到歌单分类页
  go_sheet:function(){
    wx.navigateTo({
      url: '../sheet/sheet',
    })
  },
    // 跳转到直播页面
    go_live:function(){
      wx.navigateTo({
        url: '../live/live',
      })
    },
    // 跳转到电台页面
    go_radio:function(){
      wx.navigateTo({
        url: '../radio/radio',
      })
    },
  // 跳转到精选歌单中歌单详情页
  goSheetDetail: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    // console.log(event)
    const sheetId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../sheet_detail/sheet_detail?id=${sheetId}`
    })
  },

    // 跳转到新碟详情页
    goAlbumDetail: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
      // console.log(event)
      const albumId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
      wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
        url: `../album/album?id=${albumId}`
      })
    },

  //跳转到排行榜页面
  go_rank:function(){
    wx.navigateTo({
      url: '../rank/rank',
    })
  },
   // 点击跳转到搜索页面
   go_search: function() {
    wx.navigateTo({
      url: '../search/search',
    });
  },

  // 最新音乐跳转到音乐播放页面
  playAudio: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    // console.log(event)
    const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    console.log(audioId);
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../play_music/play_music?id=${audioId}`
    })
//     wx.switchTab({
//       url: `../playing/playing?id=${audioId}`
// });
  },

//   //  歌单
//   getCategory: function() {
//   let _this = this;
//   API.getCategory({
//   }).then(res => {
//     console.log(res.data)
//       // this.setData({
//       //   newalbum:res.data.albums
//       // })
//   })
// },
    // // //  获取具体某一类歌单
    // getSheet: function() {
    //   let _this = this;
    //   API.getSheet({
    //     cat:"精品"
    //   }).then(res => {
    //     // console.log(res.data)
    //       // this.setData({
    //       //   newalbum:res.data.albums
    //       // })
    //   })
    // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var songImg = app.globalData.songImg;
    this.setData({
      songImg:songImg
    })
    this.getBanner();
    this.getNewSong();
    this.getSongSheet();
    this.getNewAlbum();

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
    // console.log("hhhhhhhhhhhhhh");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})