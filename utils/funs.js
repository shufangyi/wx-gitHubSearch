module.exports.formatNumber = function(number) {
  const num = Number(number)
  if (num <= 999) {
    return String(num)
  } else if (num > 999 && num <= 999999) {
    return Math.floor(num / 1000) + 'k'
  } else {
    return Math.floor(num / 1000000) + 'm'
  }
}
