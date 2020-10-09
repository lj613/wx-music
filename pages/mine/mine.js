// pages/mine/mine.js

const API = require('../../utils/api.js').API;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: {},  //用户id
    login_token: '',  
    playlist: [],  //用户的歌单
    user: {}  //用户详细信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //从本地中获取用户id
    app.globalData.userId = wx.getStorageSync("userId");
     console.log( app.globalData.userId)
    this.verification()   //验证是否登陆
  },

  //验证是否登陆
  verification() {   
    let login_token = wx.getStorageSync("login_token");
    app.globalData.login_token = login_token;
    console.log(login_token)
    console.log(app.globalData.userId)
    if (login_token == '') {
      this.tips('未登录,请登陆后尝试！', '去登陆', true, '/pages/login/login')
    } else {
      // 从全局中取数据
      this.setData({
        userId: app.globalData.userId,
        login_token: app.globalData.userId
      })
      this.getUserDetail();
      this.getUserPlaylist();
    }

  },

  //获取用户详细信息
  getUserDetail() {
    API.getUserDetail({ uid: this.data.userId }).then(res => {
      //请求成功
      // console.log("用户信息详情", res.data)
      this.setData({
        user: res.data
      })
    }).catch(err => {
      //请求失败
      this.tips('服务器正忙~~', '返回', false, '/pages/music/music')
    })
  },

  //获取用户歌单
  getUserPlaylist() {
    API.getUserPlaylist({
      uid: this.data.userId,
      cookie: this.data.login_token
    }).then(res => {
      console.log(res)
      //请求成功
      // console.log("用户歌单：", res.data)
      this.setData({
        playlist: res.data.playlist
      })
    }).catch(err => {
      //请求失败
      this.tips('服务器正忙~~', '返回', false, '/pages/music/music')
    })
  },

   //跳转到歌单详情页面
  gotoSongList(e) {  
    let listId = e.currentTarget.dataset.id;
    console.log(listId)
    wx.navigateTo({
      url: `../sheet_detail/sheet_detail?id=${listId}`,
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
  // 提示框
  tips(content, confirmText, isShowCancel, url) {
    wx.showModal({
      content: content,
      confirmText: confirmText,
      cancelColor: '#DE655C',
      confirmColor: '#DE655C',
      showCancel: isShowCancel,
      cancelText: '取消',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.navigateTo({
            url: url
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
          wx.switchTab({
            url: '/pages/music/music'
          })
          app.globalData.navId = 2;
        }
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