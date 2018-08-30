/*
* 来源：https://githubtrendingapi.docs.apiary.io/#
*/

const { $get } = require('../utils/fetch')
const BASEURL = 'https://github-trending-api.now.sh'

const listLanguages = function() {
  return $get(`${BASEURL}/languages`)
}

/**
 * @description
 * @author shufangyi
 * @date 2018-08-30
 * @param {string} [language='']
 * @param {string} [since='daily'] ['daily', 'weekly', 'monthly']
 * @returns
 */
const listTrendingRepo = function(language = '', since = 'daily') {
  return $get(`${BASEURL}/repositories`, {
    language: language,
    since: since
  })
}

/**
 * @description
 * @author shufangyi
 * @date 2018-08-30
 * @param {string} [language='']
 * @param {string} [since='daily']
 * @returns
 */
const listTrendingDevelopers = function(language = '', since = 'daily') {
  return $get(`${BASEURL}/developers`, {
    language: language,
    since: since
  })
}

module.exports = {
  listLanguages,
  listTrendingRepo,
  listTrendingDevelopers
}
