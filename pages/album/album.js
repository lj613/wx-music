// pages/albumId/albumId.js
const API = require('../../utils/api.js').API;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList:[],  //获取到的新碟中的歌曲
    album:[] //存储新碟的一些详细信息
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const albumId = options.id;
    console.log(albumId)
    wx.showLoading({
      title: '正在加载中',
    })
    this.getAlbumDetail(albumId);
  },
  
  //跳转到音乐播放页面
  playAudio: function (event) { 
    // console.log(event)
    const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到音乐播放页面
      url: `../play_music/play_music?id=${audioId}`
    })
  },

  //获取新碟详细内容
  getAlbumDetail(albumId){
    API.getAlbumDetail({
      id: albumId 
    }).then((res)=>{
      console.log(res);
      const waitForPlay = new Array;
      for (let i = 0; i <= res.data.songs.length - 1;i++){ //循环打印出其id
        waitForPlay.push(res.data.songs[i].id) //循环push ID 到waitForPlay数组
        app.globalData.waitForPlaying = waitForPlay  //让waitForPlay数组给全局数组
      }
      wx.hideLoading();
     this.setData({
       album:res.data.album,
       songList: res.data.songs
     })  
    })
  },

  
//播放所有歌曲
playAll() {
  let playlist = this.data.songList;
  // console.log(playlist);
  let musicId = playlist[0].id;
  for (let i = 1; i < playlist.length; i++) {
    app.globalData.waitForPlaying.push(playlist[i].id)
  }
  // 跳转到播放页面
  wx.navigateTo({
    url: `../play_music/play_music?id=${musicId}`,
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