// pages/home/index.js
const { $gql } = require('../../utils/fetch')
const { serachRepo } = require('../../api/searchRepo.gql')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    query: '',
    pageSize: 8,
    repoList: null,
    /* 
     * endCursor:"Y3Vyc29yOjEw"
     * hasNextPage:true
     * hasPreviousPage:false
     * startCursor:"Y3Vyc29yOjE=" 
     */
    pageInfo: null,
    loading: false,
    loadingMore: false,
    input_focus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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
  onPullDownRefresh: function(event) {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(event) {
    if (this.data.loadingMore || !this.data.pageInfo.hasNextPage) {
      return
    }
    this.setData({
      loadingMore: true
    })
    $gql(
      serachRepo({
        query: this.data.query,
        first: this.data.pageSize,
        after: this.data.pageInfo.endCursor
      })
    ).then(res => {
      const search = res.data.search
      this.setData({
        repoList: this.data.repoList
          ? this.data.repoList.concat(search.nodes)
          : search.nodes,
        pageInfo: search.pageInfo,
        loadingMore: false
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  searchByKeyword() {
    if (!this.data.query) {
      wx.showToast({
        title: '输入有误！',
        duration: 2000,
        icon: 'none'
      })
      return
    }
    this.setData({
      loading: true,
      repoList: null
    })
    $gql(
      serachRepo({
        query: this.data.query,
        first: this.data.pageSize
      })
    ).then(res => {
      const search = res.data.search
      this.setData({
        repoList: search.nodes,
        pageInfo: search.pageInfo,
        loading: false
      })
    })
  },
  onFocus(event) {
    this.setData({
      input_focus: true
    })
  },
  onBluer(event) {
    this.setData({
      input_focus: false
    })
  },
  onInput(event) {
    this.setData({
      query: event.detail.value
    })
  },
  onConfirm(event) {
    this.setData({
      query: event.detail.value
    })
    this.searchByKeyword()
  }
})
