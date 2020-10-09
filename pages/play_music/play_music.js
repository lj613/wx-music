// pages/play_music/play_music.js
const baseURL = 'http://localhost:3000';

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songId: -1, //歌曲id
    isPlay: true, //控制歌曲当前播放状态 默认为true 
    song: [], //歌曲信息
    nolyric: 3, //是否有歌词 1表示纯音乐,2表示暂无歌词, 3表示有歌词,支持滚动
    showLyric: true, //控制歌词页面的显示和隐藏
    duration: 0, //音频总时长
    currentTime: 0, //音频当前播放到的时间
    playTime: "00:00", //进度条显示的播放进度的当前时间
    totalTime: "00:00", //进度条显示的歌曲总时长 
    lyricArray: [], //歌词
    marginTop: 0, //歌词竖向滚动值
    currentIndex: 0, //当前歌曲句子的行号
    bgAudioManage: {}, //背景音频对象
    songImg: '', //歌曲封面
    mode: "sequence", // 播放模式 默认为列表循环
    max: 100, // 进度条最大值
    move: 0, //进度条移动的值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(audioid)
    const audioid = options.id; // onLoad()后获取到歌曲视频之类的id
    if (this.data.songId != audioid) {
      this.play(audioid); //把值传给play()
    }
  },

  //播放音乐方法
  play: function (audioid) {
    const audioId = audioid;
    const that = this; //将this对象复制给that
    that.setData({
      songId: audioId
    })
    app.globalData.songId = audioId; //让每一个要播放的歌曲ID给全局变量的songId
    console.log('把', app.globalData.songId, '传入全局变量songId中')

    //获取歌曲详情
    wx.request({
      url: baseURL + '/song/detail',
      data: {
        ids: audioId //必选参数ids
      },
      success: res => {
        console.log('歌曲详情', res.data);
        if (res.data.songs.length === 0) {
          // console.log('无法获取到资源')
          wx.showModal({ //模态对话框
            content: '服务器开了点小差~~',
            cancelColor: '#DE655C',
            confirmColor: '#DE655C',
            // showCancel: false,
            cancelText: '取消',
            confirmText: '返回',
            success(res) {
              if (res.confirm) {
                // console.log('用户点击返回')
                wx.navigateBack({})
              } else if (res.cancel) {
                // console.log('用户点击取消')
              }
            }
          })
        } else {
          app.globalData.songName = res.data.songs[0].name;
          app.globalData.songImg = res.data.songs[0].al.picUrl
          that.setData({
            song: res.data.songs[0], //获取到歌曲的详细内容，传给song
            songImg: res.data.songs[0].al.picUrl, //获取到的歌曲封面
            title: res.data.songs[0].name //获取到的歌曲名
          })
          //获取歌词
          that.getLyric(audioid);

          // 请求歌曲音频的地址，失败则播放出错，成功则传值给createAudio(后台播放管理器，让其后台播放)
          wx.request({
            url: baseURL + '/song/url',
            data: {
              id: audioId
            },
            success: res => {
              console.log('歌曲音频url:', res)
              if (res.data.data[0].url === null) {
                // 显示模态对话框
                wx.showModal({
                  content: '当前歌曲暂无资源',
                  cancelColor: '#DE655C',
                  confirmColor: '#DE655C',
                  // showCancel: false,
                  cancelText: '下一首',
                  confirmText: '返回',
                  success(res) {
                    if (res.confirm) {
                      // console.log('用户点击返回')
                      wx.navigateBack({})
                    } else if (res.cancel) {
                      // console.log('用户点击取消')
                      // 遇到歌曲没有音频 点击下一首切换
                      that.nextSong()
                    }
                  }
                })
              } else {
                this.createAudio(res.data.data[0]);
              }
            }
          })
        }

      },
    })
  },

  // 背景音频播放方法
  createAudio(res) {
    console.log("创建背景音频")
    var that = this;
    const bgAudioManage = wx.getBackgroundAudioManager(); //获取全局唯一的背景音频管理器。并把它给实例bgAudioManage

    if (res.url != null) {
      if (bgAudioManage.src != res.url) { //首次放歌或者切歌
        bgAudioManage.title = this.data.title; //把title 音频标题 给实例
        // backgroundAudioManager.singer = that.data.song.ar[0].name;             //音频歌手给实例
        bgAudioManage.coverImgUrl = this.data.songImg //把歌曲封面给实例
        bgAudioManage.src = res.url; // res.url 在createAudio 为 mp3音频  
        let songId = that.data.songId
        // app.globalData.history_songId = that.unique(app.globalData.history_songId, songId) //去除重复历史
      }
      app.globalData.isPlay = true;
      that.setData({
        isPlay: true, //是否播放设置为true
        bgAudioManage: bgAudioManage
      })
    }
    app.globalData.bgAudioManage = bgAudioManage; //把实例bgAudioManage(背景音频管理器) 给 全局bgAudioManage

    //监听背景音乐进度更新事件
    bgAudioManage.onTimeUpdate(function (res) {
      // 获取当前播放进度
      var currentTime = bgAudioManage.currentTime;
      var playTime = that.dataFormat(currentTime);
      // console.log("当前时间"+playTime);
      that.setData({
        playTime: playTime, //设置歌曲播放到的当前时间(以分为单位的字符串形式)
        move: currentTime, //设置进度条移动的值为歌曲播放到的时间(秒数)
        currentTime: currentTime,
      });

      var lyricArray = that.data.lyricArray;
      //计算滚动条的位置
      if (that.data.currentIndex >= 6) {
        that.setData({
          marginTop: (that.data.currentIndex - 6) * 40
        })
      }
      //  遍历所有歌词
      //最后一句歌词没有下一句  所以需要单独处理
      if (that.data.currentIndex == lyricArray.length - 2) {
        // 判断当前的时间大于等于最后一句歌词开始的时间
        if (currentTime >= lyricArray[lyricArray.length - 1][0]) {
          //正在唱最后一句
          that.setData({
            currentIndex: lyricArray.length - 1
          })
        }
      } else {
        for (var i = 0; i < lyricArray.length - 1; i++) {
          //将当前歌曲进度与歌词数组中的时间进行比较，如果在当前歌词的时间和下一句歌词的时间范围内则显示当前歌词
          if (currentTime >= lyricArray[i][0] && currentTime < lyricArray[i + 1][0]) {
            //设置正在播放的歌词行号
            that.setData({
              currentIndex: i
            })
          }
        }
      }
    })



    // console.log("音频地址为：" + res.url)
    // app.globalData.bgAudioManage.src = res.url
    // console.log('音频地址为：' + app.globalData.bgAudioManage.src)
    // bgAudioManage.play();
    // console.log(res)
    // bgAudioMannager.autoplay = true
    // bgAudioManage.play();

    // const history_songId = this.data.history_songId;

    // const historySong = {
    //   id: app.globalData.songId,
    //   songName: app.globalData.songName
    // }
    // history_songId.push(historySong)

    // console.log(app.globalData.isPlay);

    bgAudioManage.onPlay(res => { // 监听背景音频播放事件
      //当前歌曲总时长
      var duration = bgAudioManage.duration;
      // console.log(app.globalData.isPlay);
      // app.globalData.isPlay = true;
      // 转换歌曲时长格式
      var totalTime = this.dataFormat(duration);
      this.setData({
        max: duration, //设置进度条最大值为歌曲总时长(秒数)
        duration: duration,
        totalTime: totalTime, //设置歌曲总时长(以分为单位的字符串形式)
        // isPlay: true,
        // history_songId
      })
    });



    //监听背景音乐自然结束事件，结束后根据模式切换歌曲
    bgAudioManage.onEnded(() => {
      // console.log(app.globalData.waitForPlaying);
      // 当直接点单曲进来的时候只有一首音乐,播放列表没有其他音乐,所以播放完后切换为单曲模式,进行单曲循环
      var waitForPlaying = app.globalData.waitForPlaying;
      console.log(waitForPlaying.length);
      if (waitForPlaying.length == 0) {
        that.setData({
          mode: "single"
        })
      }
      // 判断当前的播放模式
      var mode = this.data.mode;
      if (mode == "single") {
        var currentId = app.globalData.songId;
        //重新初始化歌词的 marginTop 和行号
        that.setData({
          marginTop: 0,
          currentIndex: 0
        })
        that.play(currentId);
      } else if (this.data.mode == 'sequence') {
        that.nextSong()
      } else {
        that.randomSong();
      }
    })
    // wx.setStorageSync('historyId', history_songId); //把historyId存入缓存
  },

  // 播放和暂停状态的切换
  changeState() {
    const bgAudioManage = this.data.bgAudioManage;
    var isPlay = this.data.isPlay;
    if (isPlay) {
      console.log("暂停音乐")
      bgAudioManage.pause();
    } else {
      console.log("播放音乐")
      bgAudioManage.play();
    }
    app.globalData.isPlay = !isPlay;
    this.setData({
      isPlay: !this.data.isPlay
    })

    // console.log(app.globalData.isPlay);
    console.log(this.data.isPlay)
  },

  // 点击切换歌词页面和封面页面
  showLyric() {
    const {
      showLyric
    } = this.data;
    this.setData({
      showLyric: !showLyric
    })
  },

  //  格式化时间
  dataFormat(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    var result = `${minutes}:${seconds}`;
    return result
  },

  // 切换播放模式 单曲循环 列表循环 随机播放
  changeMode: function () {
    //获取当前的播放模式
    var mode = this.data.mode;
    if (mode == 'single') {
      //切换为列表循环
      this.setData({
        mode: "sequence"
      })
    } else if (mode == 'sequence') {
      //切换为随机模式
      this.setData({
        mode: "random"
      })
    } else {
      //切换为单曲
      this.setData({
        mode: "single"
      })
    }
  },


  // 切换到上一首歌曲
  prevSong: function () {
    //获取保存到全局变量中的到当前歌曲id
    var currentId = app.globalData.songId;
    //获取存储在全局中的歌曲id列表
    const lastSongId = app.globalData.waitForPlaying;
    // console.log(currentId)
    // console.log(lastSongId);

    // 点击的是单曲，不是歌单 所以等待播放的列表中没有其他歌，点击上一首就还是播放当前的歌曲
    if(lastSongId.length<1){
      this.play(currentId);
      console.log("当前播放为单曲，没有上一首");
      app.globalData.songId = currentId;
    }else{
      var index = 0; //记录当前歌曲的下标 默认为0
      for (var i = 0; i < lastSongId.length; i++) {
        if (currentId == lastSongId[i]) {
          index = i;
          break; //找到了就结束循环
        }
      }
      // console.log("歌曲下标--------" + index)
      // 上一首歌曲id在数组中的下标
      var prevIndex = index == 0 ? lastSongId.length - 1 : index - 1;
      // console.log("上一首歌曲id在数组中的下标--------" + prevIndex);
      //  获取上一首歌曲id
      var prevId = lastSongId[prevIndex];
      this.data.songid = prevId;
      //重新初始化歌词的 marginTop 和行号
      this.setData({
        marginTop: 0,
        currentIndex: 0
      })
      this.play(prevId) //传进play()方法中
      app.globalData.songId = prevId;
    }
  },

  // 切换到下一首歌曲
  nextSong: function () {
    //获取保存到全局变量中的到当前歌曲id
    var currentId = app.globalData.songId;
    //获取存储在全局中的歌曲id列表
    const lastSongId = app.globalData.waitForPlaying;
    // console.log(currentId)
    console.log(lastSongId);
    // 点击的是单曲，不是歌单 所以等待播放的列表中没有其他歌，点击下一首就还是播放当前的歌曲
    if(lastSongId.length<1){
      this.play(currentId);
      console.log("当前播放为单曲，没有下一首");
      app.globalData.songId = currentId;
    }else{
      var index = 0; //记录当前歌曲的下标 默认为0
      for (var i = 0; i < lastSongId.length; i++) {
        if (currentId == lastSongId[i]) {
          index = i;
          break; //找到了就结束循环
        }
      }
      // console.log("歌曲下标--------" + index)
      // 下一首歌曲id在数组中的下标
      var nextIndex = index == lastSongId.length - 1 ? 0 : index + 1;
      // console.log("下一首歌曲id在数组中的下标--------" + nextIndex);
      //  获取下一首歌曲id
      var nextId = lastSongId[nextIndex];
      this.data.songid = nextId;
      //重新初始化歌词的 marginTop 和行号
      this.setData({
        marginTop: 0,
        currentIndex: 0
      });
      this.play(nextId); //传进play()方法中
      app.globalData.songId = nextId;
    }
  },

  // 随机播放另一首
  randomSong: function () {
    // let that = this;
    const lastSongId = app.globalData.waitForPlaying;
    // console.log(lastSongId)
    const songId = lastSongId[Math.floor(Math.random() * lastSongId.length)]; //随机选取lastSongId数组的一个元素
    // console.log(songId)
    this.data.songid = songId;
    //重新初始化歌词的 marginTop 和行号
    this.setData({
      marginTop: 0,
      currentIndex: 0
    })
    this.play(songId); //传进play()方法中
    app.globalData.songId = songId;
    // console.log(that.data.songid);
  },

  // 根据歌曲id获取歌词
  getLyric: function (audioId) {
    var _this = this;
    wx.request({
      url: baseURL + '/lyric',
      data: {
        id: audioId //必选参数ids
      },
      success: function (res) {
        // console.log(res)
        if (!res.data.hasOwnProperty('lrc')) {
          // console.log("没有歌词-----------")
          _this.setData({
            nolyric: 2 //表示暂无歌词
          })
        } else if (res.data.nolyric == true) {
          _this.setData({
            nolyric: 1 //表示纯音乐
          })
        } else { //有歌词
          // 获取返回的歌词信息
          var lyrics = res.data.lrc.lyric
          // console.log(res.data.lrc.lyric)
          //调用解析歌词的方法
          var result = _this.parseLyric(lyrics);
          // console.log(result)
          //调用去掉空歌词
          var finalLyric = _this.deleteNull(result)
          // console.log(finalLyric);
          _this.setData({
            lyricArray: finalLyric,
            nolyric: 3 //表示有歌词

          })
        }

      }
    })
  },

  //格式化歌词
  parseLyric: function (text) {
    let result = [];
    let lines = text.split('\n'), //切割每一行
      pattern = /\[\d{2}:\d{2}.\d+\]/g; //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
    // console.log(lines);
    //去掉不含时间的行
    while (!pattern.test(lines[0])) {
      lines = lines.slice(1);
    };
    //上面用'\n'生成数组时，结果中最后一个为空元素，这里将去掉
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function (v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
      //提取出时间[xx:xx.xx]
      var time = v.match(pattern),
        //提取歌词
        value = v.replace(pattern, '');
      // 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
      time.forEach(function (v1, i1, a1) {
        //去掉时间里的中括号得到xx:xx.xx
        var t = v1.slice(1, -1).split(':');
        //将结果压入最终数组
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
      });
    });
    // 最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function (a, b) {
      return a[0] - b[0];
    });
    return result;
  },

  // // 解析歌词方法
  // parseLyric: function (lyrics) {
  //   var _this = this;
  //   //存储歌词和时间 并且两者一一对应
  //   var lyricResult = [];
  //   //  console.log(lyrics);
  //   //  将获得的所有歌词组成的字符串分割为每句歌词组成的数组  利用split 和\n 切割
  //   var lyricArray = lyrics.split("\n");
  //   // console.log(lyricArray);
  //   // 判断最后一个元素是否为空,如果为空则删除
  //   if (lyricArray[lyricArray.length - 1] == "") {
  //     lyricArray.pop()
  //   }
  //   // console.log(lyricArray)

  //   //利用正则匹配每句歌词对应的时间
  //   var pattern = /\[\d{2}:\d{2}\.\d{2,3}\]/;

  //   if(lyricArray[0].match(pattern) == null){
  //     // 第一个不匹配 表示歌词中没有提供时间 则不能支持自动滚动功能
  //     // console.log('1111111111111111111111111111111111');
  //       _this.setData({
  //         nolyric:2 //表示歌词不支持自动滚动
  //       });
  //       lyricResult = lyricArray;
  //       return lyricResult;
  //   }

  //   lyricArray.forEach(function (value, index, arr) {
  //     //把匹配到的时间替换为空字符
  //     var real_lyric = value.replace(pattern, "")
  //     //将每句歌词对应的时间提取到time 中
  //     var time = value.match(pattern) //返回一个数组 ["[00:00.000]", index: 0, input: "[00:00.000] 作曲 : 郭家铭KGM", groups: undefined]
  //     if (time !== null) {
  //       // 对时间进行转换  [00:00.000]  --> 00:00.000(字符串) --> 0秒
  //       var timeresult = time[0].slice(1, -1) //截取  将[00:00.000] -->00:00:000 
  //       var timeArray = timeresult.split(":");
  //       var finalTime = parseFloat(timeArray[0]) * 60 + parseFloat(timeArray[1]); //计算时间对应的秒数
  //       //  console.log(finalTime)
  //       //将处理后的歌词和时间放入lyricResult中
  //       lyricResult.push([finalTime, real_lyric])
  //     }
  //   })
  //   // console.log(lyricResult)
  //   //将结果返回
  //   return lyricResult;
  // },

  //  删除歌词中空的行
  deleteNull: function (lyricArray) {
    var result = [];
    for (var i = 0; i < lyricArray.length; i++) {
      if (lyricArray[i][1] !== "") {
        result.push(lyricArray[i]);
      }
    }
    return result;
  },

  // 拖动修改进度条进度的方法
  drag: function (e) {
    //当前进度条的value值
    console.log(e.detail.value);
    var value = e.detail.value;
    this.setData({
      currentTime: value,
    })
    //跳转到对应音频位置播放
    app.globalData.bgAudioManage.seek(value);
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