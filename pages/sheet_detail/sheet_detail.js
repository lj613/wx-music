// pages/sheet_detail/sheet_detail.js
const baseURL = 'http://neteasecloudmusicapi.zhaoboy.com';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [
      {
        img: '../../image/songList_message.png',
        name: '19万',
      },
      {
        img: '../../image/songList_share.png',
        name: '8870',
      },
      {
        img: '../../image/songList_download.png',
        name: '下载',
      },
      {
        img: '../../image/songList_choose.png',
        name: '多选',
      }
    ],
    // playlist:[],
    songList:[]
  },

  playAudio: function (event) { //event 对象，自带，点击事件后触发，event有type,target，timeStamp，currentTarget属性
    // console.log(event)
    const audioId = event.currentTarget.dataset.id; //获取到event里面的歌曲id赋值给audioId
    wx.navigateTo({                                 //获取到id带着完整url后跳转到play页面
      url: `../play_music/play_music?id=${audioId}`
    })
//     wx.switchTab({
//       url: `../playing/playing?id=${audioId}`
// });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const sheetId = options.id;
    console.log(sheetId)
    // this.setData({  
    //   id: options.id,
    // })  
    wx.request({
      url: baseURL + '/playlist/detail',
      data: {
        id: sheetId    //http://neteasecloudmusicapi.zhaoboy.com/song/url?id=xxx,id为必选参数
      },
      success: res => {
         console.log(res)

         const waitForPlay = new Array;
         for (let i = 0; i <= res.data.playlist.trackIds.length - 1;i++){ //循环打印出其id
           waitForPlay.push(res.data.playlist.trackIds[i].id) //循环push ID 到waitForPlay数组
           app.globalData.waitForPlaying = waitForPlay  //让waitForPlay数组给全局数组
           // console.log(app.globalData.waitForPlaying)
         }
        this.setData({
          playlist:res.data.playlist,
          // coverImgUrl:res.data.playlist.coverImgUrl,
          songList: res.data.playlist.tracks
        })  
      }
    })
  },
//播放所有歌曲
  playAll() {
    let playlist = this.data.playlist.tracks
    // console.log(playlist);
    let musicId = playlist[0].id
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