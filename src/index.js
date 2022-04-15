const vscode = require('vscode');
const {
  showMessage
} = require('./message.js')

const {
  YouDaoTranslate
} = require('./way/youdao.js')
const {
  provideHover
} = require('./hoverTranslate/index')


const inputTranslate = () => {
  vscode.window.showInputBox({ // 这个对象中所有参数都是可选参数
    password: false, // 输入内容是否是密码
    ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
    placeHolder: '你到底想输入什么？', // 在输入框内的提示信息
    prompt: '赶紧输入，不输入就赶紧滚', // 在输入框下方的提示信息
    // validateInput: function (text) {
    //   return text;
    // }// 对输入内容进行验证并返回
  }).then(function (msg) {
    // console.log("用户输入：" + msg);
    // ? 这里是查找的工作
    return YouDaoTranslate(msg)
  }).then(msg => {
    showMessage(msg)
    // vscode.window.showInformationMessage(msg)
  })
}

/**
 * 注册 左下角的 侧边栏
 */
const initBarItem = () => {
  const barItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left)
  barItem.command = 'extension.statusBarClick'
  barItem.text = `7287翻译`;
  barItem.show();
}
initBarItem()

const keyTranslateHandler = async () => {
  // ?
  console.log("点击了右键") 
  let editor = vscode.window.activeTextEditor;
  let doc = editor.document;
  if (editor.selection.isEmpty) {
    console.log("什么都没有选中")
    return
  }
  let text = doc.getText(editor.selection);
  let msg = await YouDaoTranslate(text)
  showMessage(msg)
  // vscode.Hover(msg)
}

/**
 * 注册 输入 翻译
 * @returns 
 */
const registerInputTranslate = () => {
  return vscode.commands.registerCommand('extension.translate', inputTranslate);
}
/**
 * 注册 悬浮 翻译
 * @returns 
 */
const registerHoverTranslate = () => {
  return vscode.languages.registerHoverProvider('*', {
    provideHover
  })
}
/**
 * 注册 点击 翻译
 */
const registerClickTranslate = () => {
  return vscode.commands.registerCommand('extension.statusBarClick', inputTranslate);
}

/**
 * 注册 右键 翻译
 */
const registerKeyBindsTranslate = () => {
  return vscode.commands.registerCommand('extension.keyTranslate', keyTranslateHandler);
}



/**
 * 
 */
module.exports = {
  registerInputTranslate,
  registerHoverTranslate,
  registerClickTranslate,
  registerKeyBindsTranslate
}