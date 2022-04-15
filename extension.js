const vscode = require('vscode');


const {
	registerInputTranslate,
	registerHoverTranslate
} = require('./src/index.js')
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log("开始插件")
	// ? 注册 输入 翻译
	const inputTranslate = registerInputTranslate()
	// ? 注册 悬浮 翻译
	const hoverTranslate = registerHoverTranslate()
	context.subscriptions.push(inputTranslate);
	context.subscriptions.push(hoverTranslate);
}

exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}