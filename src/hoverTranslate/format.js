const humps = require('humps')


function splitWordToArray (character) {
  // ? 判断单词全是大写，变成小写处理
  // todo 暂时不知怎么处理
  // if (/^[A-Z]+$/.test(character)) {
  //   humps.camelize(str.toLowerCase())
  // }

  return Array.from(new Set(humps.decamelize(humps.camelize(character),{separator: '|'}).split('|')))
}


module.exports = {
  splitWordToArray
}