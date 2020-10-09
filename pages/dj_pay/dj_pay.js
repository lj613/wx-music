// pages/dj_pay/dj_pay.js
const API = require('../../utils/api.js').API;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay:[],//付费精品列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载中...',
    })
      this.getPaygift();
  },

  getPaygift: function () {
    API.getPaygift({}).then(res => {
      wx.hideLoading();
      console.log(res)
      if (res.data.code === 200) {
        this.setData({
          pay: res.data.data.list
        })
      }
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