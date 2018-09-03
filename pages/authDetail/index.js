// pages/userDetail/index.js
const { serachUserDetail } = require('../../api/searchUserDetail.gql')
const { searchOrganizationDetail } = require('../../api/searchOrganization.gql')
const { $gql } = require('../../utils/fetch')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    organizationInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.login) {
      this.getUserDetail(options.login, options.type)
    } else {
      console.log('参数错误')
      wx.navigateBack()
    }
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
  getUserDetail(loginName, type) {
    if (type === 'user') {
      $gql(
        serachUserDetail({
          login: loginName
        })
      )
        .then(res => {
          this.setData({
            userInfo: res,
            organizationInfo: null
          })
        })
        .catch(e => {
          console.log(e)
        })
    } else if (type === 'organization') {
      $gql(
        searchOrganizationDetail({
          login: loginName
        })
      )
        .then(res => {
          this.setData({
            organizationInfo: res.data.organization,
            userInfo: null
          })
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
})
