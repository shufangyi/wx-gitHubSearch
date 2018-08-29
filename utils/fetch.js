const cfg = require('../config')

const instance = function({ url, method, data, header }) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: Object.assign({}, header, {
        'content-type': 'application/json'
      }),
      success(res) {
        if (String(res.statusCode).startsWith('2')) {
          resolve(res.data)
        } else {
          reject(new Error(res))
        }
      },
      fail(err) {
        reject(new Error(err))
      }
    })
  })
}

const get = function(url, data = {}, header = {}) {
  return instance({
    url,
    method: 'GET',
    data,
    header
  })
}

const post = function(url, data = {}, header = {}) {
  return instance({
    url,
    method: 'POST',
    data,
    header
  })
}

const gql = function(graphql, header = {}) {
  return instance({
    url: cfg.API_BASE,
    method: 'POST',
    data: graphql,
    header: Object.assign({}, header, {
      Authorization: `bearer ${cfg.GITHUB_KEY}`
    })
  })
}

module.exports = {
  $request: instance,
  $get: get,
  $post: post,
  $gql: gql
}
