// pages/home/index.js
const { $gql } = require('../../utils/fetch')
const { serachRepo } = require('../../graphql/searchRepo.gql')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    query: 'vue',
    pageSize: 10,
    repoList: [],
    /* 
     * endCursor:"Y3Vyc29yOjEw"
     * hasNextPage:true
     * hasPreviousPage:false
     * startCursor:"Y3Vyc29yOjE=" 
     */
    pageInfo: null,
    loading: true,
    input_focus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      loading: true
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
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
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
  onConfirm(event) {
    console.log(event)
  }
})
