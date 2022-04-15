const Request = require('request-promise')
const crypto = require('crypto');
const vscode = require('vscode');
// 获取配置参数
const getConfigValue = function (name) {
  return vscode.workspace.getConfiguration('7287translate').get(name);
}

const apiKey = getConfigValue("APIKey")
const SecretKey = getConfigValue("SecretKey")
console.log("结果", apiKey, SecretKey)

class YouDao {
  constructor() {
    this.config = {
      from: 'auto', // zh-CHS(中文) || ja(日语) || EN(英文) || fr(法语) ...
      to: 'auto',
      appKey: apiKey, // https://ai.YouDao.com 在有道云上进行注册
      secretKey: SecretKey
    }
    this.url = 'https://openapi.YouDao.com/api';
  }
  /**
   * 翻译
   * */
  async tanslate(word) {
    // ? 1. 处理文本
    // ? 注意：官网的文档写的有问题，对于中文通过url编码
    let encodeURLWord = encodeURI(word)
    let salt = (new Date).getTime()
    let curtime = Math.round(new Date().getTime() / 1000);
    // ? 注意：官网写的文档，说需要添加 currentTime, 但是添加了之后反而有问题
    let sign = this.md5(this.config.appKey + word + salt + this.config.secretKey)
    let paramsJson = {
      q: encodeURLWord,
      form: this.config.from,
      to: this.config.to,
      appKey: this.config.appKey,
      salt,
      sign,
    }

    // ? 发起请求
    let url = this.url + '?' + this.generateUrlParams(paramsJson)
    // ? 发起请求
    let result = await Request.get({
      url
    })
    return result
  }
  md5(str) {
    let crypto_md5 = crypto.createHash("md5")
    crypto_md5.update(str)
    return crypto_md5.digest('hex')
  }
  generateUrlParams(params) {
    let paramsData = []
    for (let key in params) {
      paramsData.push(key + '=' + params[key])
    }
    return paramsData.join('&')
  }
  truncate(q) {
    let len = q.length;
    if (len <= 20) return q;
    return q.substring(0, 10) + len + q.substring(len - 10, len);
  }
}

const _YouDao = new YouDao()
const YouDaoTranslate = async (word) => {
  let res = await _YouDao.tanslate(word)
  const ans = JSON.parse(res)
  return ans.translation[0]
}

module.exports = {
  YouDaoTranslate
}