// pages/dj_rank/dj_rank.js
const API = require('../../utils/api.js').API;
// const baseURL = 'http://localhost:3000';  //获取热门电台榜单

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotDj:[]  ,//热门电台榜单
    limit:12  //请求数据的数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getDjProgramlist();
  },
  getDjProgramlist: function () {
    var limit  = this.data.limit;
    API.getDjProgramlist({
      type:"hot",
      limit:limit
    }).then((res)=>{
      wx.hideLoading();
      console.log(res)
        this.setData({
          hotDj:res.data.toplist
        })
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
  // 滚动到底部加载跟多数据
  onReachBottom: function () {
  //  console.log("到底了")
   var limit = this.data.limit;
   this.setData({
     limit:limit + 4
   })
   wx.showLoading({
     title: '加载更多中',
   })
   this.getDjProgramlist();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})