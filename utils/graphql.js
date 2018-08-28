/*
 * File: graphql.js
 * Project: utils
 * Description: 来源：https://github.com/yoshuawuyts/nanographql
 * File Created: Monday, 27th August 2018 3:55:44 pm
 */

var getOpname = /(query|mutation) ?([\w\d-_]+)? ?\(.*?\)? \{/

function nanographql(str) {
  str = Array.isArray(str) ? str.join('') : str
  var name = getOpname.exec(str)
  return function(variables) {
    var data = { query: str }
    if (variables) data.variables = JSON.stringify(variables)
    if (name && name.length) {
      var operationName = name[2]
      if (operationName) data.operationName = name[2]
    }
    return JSON.stringify(data)
  }
}

module.exports = nanographql

/*
 * demo
 * 
 * var query = gql`
 * query($name: String!) {
 *  movie (name: $name) {
 *    releaseDate
 *  }
 * }
 * try {
 *  var res = await fetch('/query', {
 *    body: query({ name: 'Back to the Future' }),
 *    method: 'POST'
 *  })
 *  var json = res.json()
 *  console.log(json)
 * } catch (err) {
 *  console.error(err)
 * }
 */
