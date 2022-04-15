const vscode = require('vscode');
const showMessage = (msg) => {
  vscode.window.showInformationMessage(msg)
}

// 检测是否中文
function isChinese(text) {
  return /[\u4E00-\u9FA5\uF900-\uFA2D]/.test(text)
}

module.exports = {
  showMessage
}