// pages/rank/rank.js
const API = require('../../utils/api.js').API;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankingList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '怎在加载中...',
    })
    this.getTopList()
  },

  //获取歌单排行榜
  getTopList: function () {
    API.getTopList({}).then(res => {
      console.log(res)
      wx.hideLoading();
      this.setData({
        rankingList: res.data.list
      })
    })
  },

  //跳转到歌单详情页面
  go_detail: function (event) {
    // console.log(event);
    const rankId = event.currentTarget.dataset.id; //获取到event里面的歌单榜id赋值给rankId
    wx.navigateTo({
      url: `../rank_detail/rank_detail?id=${rankId}`
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