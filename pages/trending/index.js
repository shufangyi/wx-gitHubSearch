// pages/rank/index.js
const trendingAPI = require('../../api/trending')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    repoList: null,
    developersList: null,
    language: '',
    since: 'daily',
    type: 'repo', // deve
    loading: false,
    err: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadRepoList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function(event) {
    if (this.data.type === 'repo') {
      this.loadRepoList()
    } else if (this.data.type === 'deve') {
      this.loadDeveList()
    } else {
      wx.stopPullDownRefresh()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  loadRepoList() {
    this.setData({
      loading: true,
      repoList: null
    })
    trendingAPI
      .listTrendingRepo(this.data.language, this.data.since)
      .then(res => {
        this.setData({
          repoList: res,
          loading: false
        })
        wx.stopPullDownRefresh()
      })
      .catch(e => {
        console.log(e)
        this.setData({
          loading: false,
          err: true
        })
        wx.stopPullDownRefresh()
      })
  },
  loadDeveList() {
    this.setData({
      loading: true,
      developersList: null
    })
    trendingAPI
      .listTrendingDevelopers(this.data.language, this.data.since)
      .then(res => {
        this.setData({
          developersList: res,
          loading: false
        })
        wx.stopPullDownRefresh()
      })
      .catch(e => {
        console.log(e)
        this.setData({
          loading: false,
          err: true
        })
        wx.stopPullDownRefresh()
      })
  },
  toggleList(event) {
    const mode = event.target.dataset.mode
    if (mode === this.data.type) {
      return
    }
    if (this.data.type === 'deve') {
      this.setData({
        type: 'repo'
      })
      this.loadRepoList()
    } else {
      this.setData({
        type: 'deve'
      })
      this.loadDeveList()
    }
  }
})
