// component/control/control.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    songName: '',
    songId: -1,
    songImg: '',
    isPlay: true, //控制歌曲当前播放状态
    

  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      this.setData({
        songName: app.globalData.songName,
        songId: app.globalData.songId,
        songImg: app.globalData.songImg,
        isPlay:app.globalData.isPlay
      })
      
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goPlay() {
      wx.navigateTo({
        url: `/pages/play_music/play_music?id=${app.globalData.songId}`,
        success: function (res) {
          // success
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    },

    // 播放和暂停 切换
    changeState() {
      const bgAudioManage = app.globalData.bgAudioManage;
      const {
        isPlay
      } = this.data;
      if (isPlay) {
        bgAudioManage.pause();
      } else {
        bgAudioManage.play();
      }
     app.globalData.isPlay = !isPlay;
      this.setData({
        isPlay: app.globalData.isPlay
      })
      console.log(this.data.isPlay)
    },
  }
})