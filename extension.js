const vscode = require("vscode");

const {
  registerInputTranslate,
  registerHoverTranslate,
  registerClickTranslate,
  registerKeyBindsTranslate,
  // registerSelectTranslate,
} = require("./src/index.js");
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("开始插件");
  // ? 注册 输入 翻译
  const inputTranslate = registerInputTranslate();
  // ? 注册 悬浮 翻译
  const hoverTranslate = registerHoverTranslate();
  // ? 注册 点击 翻译
  const clickTranslate = registerClickTranslate();
  // ? 注册 右键 翻译
  const keyTranslate = registerKeyBindsTranslate();
  // ? 滑动 翻译 句子
  // const selectTranslate = registerSelectTranslate()
  context.subscriptions.push(inputTranslate);
  context.subscriptions.push(hoverTranslate);
  context.subscriptions.push(clickTranslate);
  context.subscriptions.push(keyTranslate);
  // context.subscriptions.push(selectTranslate);
}

exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
