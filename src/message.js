const vscode = require('vscode');
const showMessage = (msg) => {
  vscode.window.showInformationMessage(msg)
}

module.exports = {
  showMessage
}