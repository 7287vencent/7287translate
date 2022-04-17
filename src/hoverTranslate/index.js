const vscode = require("vscode");
const formatter = require("./format");
const DICTQuery = require("./query");
const markdownHeader = `翻译 \`$word\` :  
`;
const markdownFooter = `  
`;
const markdownLine = `  
*****
`;
const genMarkdown = function (word, translation) {
  if (!translation) {
    return `- [${word}](https://translate.google.cn?text=${word}) :  
本地词库暂无结果 , 查看 [Google翻译](https://translate.google.cn?text=${word}) [百度翻译](https://fanyi.baidu.com/#en/zh/${word})`;
  }
  return `- [${word}](https://translate.google.cn?text=${word}) :  
${translation.replace(
  /\\n/g,
  `  
`
)}`;
};
async function provideHover(document, position, token) {
  console.log("滑动单词");
  // ? 获取单词
  let text = document.getText(document.getWordRangeAtPosition(position));
  // console.log("选择的单词", text)
  let select = document.getText(vscode.window.activeTextEditor.selection);
  // console.log("滑动选择的单词", select)
  // ? 选择的单词优先及更高
  if (select && select.includes(text)) {
    text = select;
  }
  // ? 分隔单词
  const words = formatter.splitWordToArray(text);

  // console.log("切割后的单词", words)
  let hoverText = "";
  for (let word of words) {
    let ret = await DICTQuery(word);
    hoverText += markdownLine + genMarkdown(word, ret);
  }

  // ? 最后处理头部
  const header = markdownHeader.replace("$word", text);
  hoverText = header + hoverText + markdownFooter;
  // console.log("结果", hoverText)
  return new vscode.Hover(hoverText);
}

// function init() {
//   // ? 1. 注册鼠标 hover 事件
//   vscode.languages.registerHoverProvider('*', {
//     provideHover
//   })
//   // ? 2. 注册事件
// }

module.exports = {
  provideHover,
};
