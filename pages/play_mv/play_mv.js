// play_mv.js
var app = getApp();

const baseURL = 'http://neteasecloudmusicapi.zhaoboy.com';
// const baseURL = 'http://localhost:3000';
Page({
  data: {
    mv: [],
    autoplay: true,
    showfullscreenbtn: true,
    showmutebtn: true,
    objectfit: 'contain',
    showPlayBtn: 'true',
    mvDesc: []
  },

  onLoad: function (options) {
    const mvid = options.mvid; // onLoad()后获取到歌曲视频之类的id
    //  console.log("接收到的mvid"+mvid)
    // 请求MV的地址，失败则播放出错，成功则传值给createBgAudio(后台播放管理器，让其后台播放)
    wx.request({
      url: baseURL + '/mv/detail',
      data: {
        mvid: mvid
      },
      success: res => {
        console.log('歌曲音频url:', res)
        // console.log(res.data.data.brs['480'])
        if (Object.keys(res.data.data.brs).length === 0) { //如果是MV 电台 广告 之类的就提示播放出错，并返回首页
          console.log('播放出错')
          wx.showModal({
            content: '暂无视频资源',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            showCancel: false,
            confirmText: '返回',
            complete() {
              wx.switchTab({
                url: '/pages/music/music'
              })
            }
          })
        } else {
          var desc = res.data.data.desc;
          // 处理mv描述内容的格式
          var descArray = desc.split("\n");
          var mvDesc = this.deleteNull(descArray)
          this.setData({
            mv: res.data.data,
            mvDesc: mvDesc
          })
        }
      }
    })
  },

  // 删掉空内容
  deleteNull: function (descArray) {
    var result = [];
    for (var i = 0; i < descArray.length; i++) {
      if (descArray[i] !== "") {
        result.push(descArray[i]);
      }
    }
    return result;
  },
})