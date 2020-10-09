// pages/radio/radio.js
const API = require('../../utils/api.js').API;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    indicatorDots: true,
    indicatorActiveColor: "#31c27c",
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    recommend_create: [], //电台：创作|翻唱
    more_recommend_create: [],
    recommend_3D: [], //电台：3D|电子
    more_recommend_3D: [],
    recommend_feeling: [], //情感调频
    more_recommend_feeling: [],
    recommend_musicstory: [], //音乐故事
    more_recommend_musicstory: [],
    recommend_2D: [], //二次元
    more_recommend_2D: [],
    recommend_audiobook: [], //有声书
    more_recommend_audiobook: [],
    recommend_radioplay: [], //广播剧
    more_recommend_radioplay: [],
    recommend_reading: [], //美文读物
    more_recommend_reading: [],
    recommend_crosstalk: [], //相声曲艺
    more_recommend_crosstalk: [],
    recommend_history: [], //人文历史
    more_recommend_history: [],
    recommend_talkshow: [], //脱口秀
    more_recommend_talkshow: [],
    recommend_movies: [], //娱乐影视
    more_recommend_movies: [],
    recommend_foreignlanguage: [], //外语世界
    more_recommend_foreignlanguage: [],
    recommend_skills: [], //知识技能
    more_recommend_skills: [],
    recommend_baby: [], //亲子宝贝
    more_recommend_baby: [],
    recommend_education: [], //校园教育
    more_recommend_education: [],
    recommend_finance: [], //商业财经
    more_recommend_finance: [],
    recommend_science: [], //科技科学
    more_recommend_science: [],
    recommend_tourism: [], //路途|城市
    more_recommend_tourism: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getDjBanner();
    this.getRecommendType()
  },

  // 获取电台轮播图
  getDjBanner: function () {
    API.getDjBanner({}).then((res) => {
      this.setData({
        banners: res.data.data
      })
      console.log(res)
    })
  },

  //跳转到电台分类页面
  go_category: function () {
    wx.navigateTo({
      url: '../dj_category/dj_category',
    })
  },

  //跳转到付费精品页面
  go_pay: function () {
    wx.navigateTo({
      url: '../dj_pay/dj_pay',
    })
  },

  //跳转到电台排行页面
  go_rank: function () {
    wx.navigateTo({
      url: '../dj_rank/dj_rank',
    })
  },

  //获取推荐内容
  getRecommendType: function () {
    // 获取创作翻唱内容
    API.getRecommendType({
      type: 2001
    }).then(res => {
      // console.log(res)
      this.setData({
        recommend_create: res.data.djRadios.slice(0, 3),
        more_recommend_create: res.data.djRadios
      })
    })

    //获取有声书部分内容
    API.getRecommendType({
      type: 10001
    }).then(res => {
      this.setData({
        recommend_audiobook: res.data.djRadios.slice(0, 3),
        more_recommend_audiobook: res.data.djRadios
      })
    })

    // 获取情感调频部分内容
    API.getRecommendType({
      type: 3
    }).then(res => {
      this.setData({
        recommend_feeling: res.data.djRadios.slice(0, 3),
        more_recommend_feeling: res.data.djRadios
      })
    })

    // 获取广播剧部分内容
    API.getRecommendType({
      type: 7
    }).then(res => {
      this.setData({
        recommend_radioplay: res.data.djRadios.slice(0, 3),
        more_recommend_radioplay: res.data.djRadios
      })
    })

    // 获取音乐故事部分内容
    API.getRecommendType({
      type: 2
    }).then(res => {
      this.setData({
        recommend_musicstory: res.data.djRadios.slice(0, 3),
        more_recommend_musicstory: res.data.djRadios
      })
    })

    // 获取娱乐影视部分内容
    API.getRecommendType({
      type: 4
    }).then(res => {
      this.setData({
        recommend_movies: res.data.djRadios.slice(0, 3),
        more_recommend_movies: res.data.djRadios
      })
    })

    //获取3D|电子 内容
    API.getRecommendType({
      type: 10002
    }).then(res => {
      this.setData({
        recommend_3D: res.data.djRadios.slice(0, 3),
        more_recommend_3D: res.data.djRadios
      })
    })

    // 获取美文读物部分内容
    API.getRecommendType({
      type: 6
    }).then(res => {
      this.setData({
        recommend_reading: res.data.djRadios.slice(0, 3),
        more_recommend_reading: res.data.djRadios
      })
    })

    //获取二次元部分内容
    API.getRecommendType({
      type: 3001
    }).then(res => {
      this.setData({
        recommend_2D: res.data.djRadios.slice(0, 3),
        more_recommend_2D: res.data.djRadios
      })
    })
    // 获取脱口秀部分内容
    API.getRecommendType({
      type: 5
    }).then(res => {
      this.setData({
        recommend_talkshow: res.data.djRadios.slice(0, 3),
        more_recommend_talkshow: res.data.djRadios
      })
    })

    // 获取知识技能部分内容
    API.getRecommendType({
      type: 453050
    }).then(res => {
      this.setData({
        recommend_skills: res.data.djRadios.slice(0, 3),
        more_recommend_skills: res.data.djRadios
      })
    })

    //获取商业财经部分内容
    API.getRecommendType({
      type: 453051
    }).then(res => {
      this.setData({
        recommend_finance: res.data.djRadios.slice(0, 3),
        more_recommend_finance: res.data.djRadios
      })
    })

    // 获取人文历史部分内容
    API.getRecommendType({
      type: 11
    }).then(res => {
      this.setData({
        recommend_history: res.data.djRadios.slice(0, 3),
        more_recommend_history: res.data.djRadios
      })
    })

    // 获取外语世界部分内容
    API.getRecommendType({
      type: 13
    }).then(res => {
      this.setData({
        recommend_foreignlanguage: res.data.djRadios.slice(0, 3),
        more_recommend_foreignlanguage: res.data.djRadios
      })
    })

    //获取亲子宝贝部分内容
    API.getRecommendType({
      type: 14
    }).then(res => {
      this.setData({
        recommend_baby: res.data.djRadios.slice(0, 3),
        more_recommend_baby: res.data.djRadios
      })
    })

    // 获取相声曲艺部分内容
    API.getRecommendType({
      type: 8
    }).then(res => {
      this.setData({
        recommend_crosstalk: res.data.djRadios.slice(0, 3),
        more_recommend_crosstalk: res.data.djRadios
      })
    })
    
    // 获取旅途城市部分内容
    API.getRecommendType({
      type: 12
    }).then(res => {
      this.setData({
        recommend_tourism: res.data.djRadios.slice(0, 3),
        more_recommend_tourism: res.data.djRadios
      })
    })
  },

  // 换一批
  change_1: function () {
    let maxNum = this.data.more_recommend_create.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_create: []
    })
    //重新取3组数据
    this.data.recommend_create.push(this.data.more_recommend_create[r1])
    this.data.recommend_create.push(this.data.more_recommend_create[r2])
    this.data.recommend_create.push(this.data.more_recommend_create[r3])
    //重新赋值
    this.setData({
      recommend_create: this.data.recommend_create
    })
  },
  change_2: function () {
    let maxNum = this.data.more_recommend_audiobook.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_audiobook: []
    })
    //重新取3组数据
    this.data.recommend_audiobook.push(this.data.more_recommend_audiobook[r1])
    this.data.recommend_audiobook.push(this.data.more_recommend_audiobook[r2])
    this.data.recommend_audiobook.push(this.data.more_recommend_audiobook[r3])
    //重新赋值
    this.setData({
      recommend_audiobook: this.data.recommend_audiobook
    })
  },

  change_3: function () {
    let maxNum = this.data.more_recommend_feeling.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_feeling: []
    })
    //重新取3组数据
    this.data.recommend_feeling.push(this.data.more_recommend_feeling[r1])
    this.data.recommend_feeling.push(this.data.more_recommend_feeling[r2])
    this.data.recommend_feeling.push(this.data.more_recommend_feeling[r3])
    //重新赋值
    this.setData({
      recommend_feeling: this.data.recommend_feeling
    })
  },
  change_4: function () {
    let maxNum = this.data.more_recommend_radioplay.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_radioplay: []
    })
    //重新取3组数据
    this.data.recommend_radioplay.push(this.data.more_recommend_radioplay[r1])
    this.data.recommend_radioplay.push(this.data.more_recommend_radioplay[r2])
    this.data.recommend_radioplay.push(this.data.more_recommend_radioplay[r3])
    //重新赋值
    this.setData({
      recommend_radioplay: this.data.recommend_radioplay
    })
  },
  change_5: function () {
    let maxNum = this.data.more_recommend_musicstory.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_musicstory: []
    })
    //重新取3组数据
    this.data.recommend_musicstory.push(this.data.more_recommend_musicstory[r1])
    this.data.recommend_musicstory.push(this.data.more_recommend_musicstory[r2])
    this.data.recommend_musicstory.push(this.data.more_recommend_musicstory[r3])
    //重新赋值
    this.setData({
      recommend_musicstory: this.data.recommend_musicstory
    })
  },
  change_6: function () {
    let maxNum = this.data.more_recommend_movies.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_movies: []
    })
    //重新取3组数据
    this.data.recommend_movies.push(this.data.more_recommend_movies[r1])
    this.data.recommend_movies.push(this.data.more_recommend_movies[r2])
    this.data.recommend_movies.push(this.data.more_recommend_movies[r3])
    //重新赋值
    this.setData({
      recommend_movies: this.data.recommend_movies
    })
  },
  change_7: function () {
    let maxNum = this.data.more_recommend_3D.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_3D: []
    })
    //重新取3组数据
    this.data.recommend_3D.push(this.data.more_recommend_3D[r1])
    this.data.recommend_3D.push(this.data.more_recommend_3D[r2])
    this.data.recommend_3D.push(this.data.more_recommend_3D[r3])
    //重新赋值
    this.setData({
      recommend_3D: this.data.recommend_3D
    })
  },

  change_8: function () {
    let maxNum = this.data.more_recommend_reading.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_reading: []
    })
    //重新取3组数据
    this.data.recommend_reading.push(this.data.more_recommend_reading[r1])
    this.data.recommend_reading.push(this.data.more_recommend_reading[r2])
    this.data.recommend_reading.push(this.data.more_recommend_reading[r3])
    //重新赋值
    this.setData({
      recommend_reading: this.data.recommend_reading
    })
  },
  change_9: function () {
    let maxNum = this.data.more_recommend_2D.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_2D: []
    })
    //重新取3组数据
    this.data.recommend_2D.push(this.data.more_recommend_2D[r1])
    this.data.recommend_2D.push(this.data.more_recommend_2D[r2])
    this.data.recommend_2D.push(this.data.more_recommend_2D[r3])
    //重新赋值
    this.setData({
      recommend_2D: this.data.recommend_2D
    })
  },
  change_10: function () {
    let maxNum = this.data.more_recommend_talkshow.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_talkshow: []
    })
    //重新取3组数据
    this.data.recommend_talkshow.push(this.data.more_recommend_talkshow[r1])
    this.data.recommend_talkshow.push(this.data.more_recommend_talkshow[r2])
    this.data.recommend_talkshow.push(this.data.more_recommend_talkshow[r3])
    //重新赋值
    this.setData({
      recommend_talkshow: this.data.recommend_talkshow
    })
  },
  change_11: function () {
    let maxNum = this.data.more_recommend_skills.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_skills: []
    })
    //重新取3组数据
    this.data.recommend_skills.push(this.data.more_recommend_skills[r1])
    this.data.recommend_skills.push(this.data.more_recommend_skills[r2])
    this.data.recommend_skills.push(this.data.more_recommend_skills[r3])
    //重新赋值
    this.setData({
      recommend_skills: this.data.recommend_skills
    })
  },
  change_12: function () {
    let maxNum = this.data.more_recommend_finance.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_finance: []
    })
    //重新取3组数据
    this.data.recommend_finance.push(this.data.more_recommend_finance[r1])
    this.data.recommend_finance.push(this.data.more_recommend_finance[r2])
    this.data.recommend_finance.push(this.data.more_recommend_finance[r3])
    //重新赋值
    this.setData({
      recommend_finance: this.data.recommend_finance
    })
  },
  change_13: function () {
    let maxNum = this.data.more_recommend_history.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_history: []
    })
    //重新取3组数据
    this.data.recommend_history.push(this.data.more_recommend_history[r1])
    this.data.recommend_history.push(this.data.more_recommend_history[r2])
    this.data.recommend_history.push(this.data.more_recommend_history[r3])
    //重新赋值
    this.setData({
      recommend_history: this.data.recommend_history
    })
  },
  change_14: function () {
    let maxNum = this.data.more_recommend_foreignlanguage.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_foreignlanguage: []
    })
    //重新取3组数据
    this.data.recommend_foreignlanguage.push(this.data.more_recommend_foreignlanguage[r1])
    this.data.recommend_foreignlanguage.push(this.data.more_recommend_foreignlanguage[r2])
    this.data.recommend_foreignlanguage.push(this.data.more_recommend_foreignlanguage[r3])
    //重新赋值
    this.setData({
      recommend_foreignlanguage: this.data.recommend_foreignlanguage
    })
  },
  change_15: function () {
    let maxNum = this.data.more_recommend_baby.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_baby: []
    })
    //重新取3组数据
    this.data.recommend_baby.push(this.data.more_recommend_baby[r1])
    this.data.recommend_baby.push(this.data.more_recommend_baby[r2])
    this.data.recommend_baby.push(this.data.more_recommend_baby[r3])
    //重新赋值
    this.setData({
      recommend_baby: this.data.recommend_baby
    })
  },
  change_16: function () {
    let maxNum = this.data.more_recommend_crosstalk.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_crosstalk: []
    })
    //重新取3组数据
    this.data.recommend_crosstalk.push(this.data.more_recommend_crosstalk[r1])
    this.data.recommend_crosstalk.push(this.data.more_recommend_crosstalk[r2])
    this.data.recommend_crosstalk.push(this.data.more_recommend_crosstalk[r3])
    //重新赋值
    this.setData({
      recommend_crosstalk: this.data.recommend_crosstalk
    })
  },
  change_17: function () {
    let maxNum = this.data.more_recommend_tourism.length //计算数据长度
    let r1 = parseInt(Math.random() * (maxNum - 0) + 0); //取【0-数据长度】内的整数随机数
    let r2 = parseInt(Math.random() * (maxNum - 0) + 0);
    let r3 = parseInt(Math.random() * (maxNum - 0) + 0);
    this.setData({
      recommend_tourism: []
    })
    //重新取3组数据
    this.data.recommend_tourism.push(this.data.more_recommend_tourism[r1])
    this.data.recommend_tourism.push(this.data.more_recommend_tourism[r2])
    this.data.recommend_tourism.push(this.data.more_recommend_tourism[r3])
    //重新赋值
    this.setData({
      recommend_tourism: this.data.recommend_tourism
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