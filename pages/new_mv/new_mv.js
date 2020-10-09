var app = getApp();
const API = require('../../utils/api.js').API;


Page({

  data: {
    mv:[],//保存获取的MV结果
    limit:8 //请求数据的数量
  },


  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getNewMv()
  },

  //获取mv
  getNewMv: function () {
    var limit = this.data.limit
    API.getNewMv({
      limit:limit
    }).then(res => {
      wx.hideLoading();
      console.log(res)
      if (res.data.code === 200) {
        this.setData({
          mv: res.data.data
        })
      }
    })
  },

  //跳转到mv播放页面
  PlayMv:function(event){
    const mvId = event.currentTarget.dataset.id;
    // console.log("mvid-------"+mvId)
    wx.navigateTo({                                 //获取到id带着完整url后跳转到mv播放页面
      url: `../play_mv/play_mv?mvid=${mvId}`
    })
  },

    /**
   * 页面上拉触底事件的处理函数
   */

  // 到达页面底部加载更多mv
  onReachBottom: function () {
    // console.log("到底部了");
   var limit = this.data.limit;
   this.setData({
     limit:limit + 6
   })
    wx.showLoading({
      title: '加载更多中',
    });
    this.getNewMv()
  },
})