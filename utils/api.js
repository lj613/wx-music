const app = getApp();
// method(HTTP 请求方法)，网易云API提供get和post两种请求方式
const GET = 'GET';
const POST = 'POST';
// 定义全局常量baseUrl用来存储前缀
// const baseURL = 'http://neteasecloudmusicapi.zhaoboy.com';
const baseURL = 'http://localhost:3000';

function request(method, url, data) {
  return new Promise(function (resolve, reject) {
    let header = {    //定义请求头
      'content-type': 'application/json',
      'cookie': app.globalData.login_token
    };
    wx.request({
      url: baseURL + url,
      method: method,
      data: method === POST ? JSON.stringify(data) : data,
      header: header,
      success(res) {
        //请求成功
        //判断状态码---errCode状态根据后端定义来判断
        if (res.data.code == 200) {  //请求成功
          resolve(res);
        } else {
          //其他异常
          reject('运行时错误,请稍后再试');
        }
      },
      fail(err) {
        //请求失败
        reject(err)
      }
    })
  })
}

const API = {
  getBanner:(data)=>{
    return request(GET,`/banner`,data)//个性推荐轮播
  },
  getNewSong:(data)=>{
    return request(GET,`/personalized/newsong`,data)//最新音乐接口
  },
  getSongSheet:(data)=>{
  return request(GET,`/top/playlist`,data)//热门歌单接口
  },
  getNewAlbum:(data)=>{
    return request(GET,`/top/album`,data)//新碟上架
    },
    getAlbumDetail:(data)=>{
      return request(GET,`/album`,data)//获取新碟内容
      },
  getSongDetail: (data) => request(GET, `/song/detail`, data),  //获取歌曲详情
  getSongUrl:(data) => request(GET, `/song/url`, data),  //获取歌曲路径
  getRecommendSongs:(data)=>{
    return request(GET,`/recommend/songs`,data)  //获取每日推荐歌曲
  },
  getRecommendMV:(data)=>{
    return request(GET,`/personalized/mv`,data)//推荐MV
  },
  getNewMv:(data)=>{
    return request(GET,`/mv/first`,data)//最新MV
  },
  getCategory:(data)=>{
    return request(GET,`/playlist/catlist`,data)  //获取歌单分类
  },
  getSheet:(data)=>{
    return request(GET,`/top/playlist`,data)  //按某种类别获取对应歌单
  },
  getHighquality:(data)=>{
    return request(GET,`/top/playlist/highquality`,data)  //获取精品歌单
  },
  getRecommendSheet:(data)=>{
    return request(GET,`/personalized`,data)  //获取推荐歌单
  },
  getTopList:(data)=>{
    return request(GET,`/toplist`,data)  //获取所有榜单
  },
  getRankDetail:(data)=>{
    return request(GET,`/playlist/detail`,data)  //获取所有榜单详情
  },
  getSearchResult:(data)=>{
    return request(GET,`/search`,data)//搜索结果接口
  },
  getHotSongs:(data) =>{
    return request(GET,`/search/hot`,data)//热搜接口
  },
  getLyric:(data) =>{
    return request(GET,`/lyric`,data)//歌词接口
  },
  getDjBanner:(data) =>{
    return request(GET,`/dj/banner`,data)// 电台轮播图接口
  },
  getDjCateList:(data)=>{
    return request(GET,`/dj/catelist`,data) //获取电台的分类
  },
  getPaygift:(data)=>{
    return request(GET,'/dj/paygift',data)//付费精品  电台
  },
  getRecommendType:(data)=>{
    return request(GET, `/dj/recommend/type`,data)//所有电台分类推荐
  },
  getDjProgramlist:(data)=>{
    // return request(GET, `/dj/program/toplist/hours`,data)// 电台24小时节目榜
    // return request(GET, `/dj/hot`,data)// 电台24小时节目榜
    return request(GET, `/dj/toplist`,data)// 获取热门电台榜

    // return request(GET, `http://localhost:3000/dj/radio/hot`,data)// 电台24小时节目榜
    // return request(GET, `/dj/radio/hot`,data)// 电台24小时节目榜
  },
  login: (data) =>{
    return request(GET, `/login/cellphone`, data)  //手机登录
  },
  getUserDetail: (data) => {
    return  request(GET, `/user/detail`, data) //登陆后调用此接口 , 传入用户 id, 可以获取用户详情

  },
  getUserPlaylist: (data) => {
  return  request(GET, `/user/playlist`, data) // 登陆后调用此接口 , 传入用户 id, 可以获取用户歌单

  }


  
};
module.exports = {
  API: API
}