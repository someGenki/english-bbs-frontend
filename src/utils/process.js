import emotions from '../assets/js/EmotionList.js';

const colors = [
  '#2196F3', '#32c787', '#00BCD4', '#ff5652',
  '#ffc107', '#ff85af', '#FF9800', '#39bbb0',
  '#f56a00', '#7265e6', '#ffbf00', '#00a2ae'
];


/**
 * 
 * @param {*} str xxx#色;yyy
 */
export function processEmotion(str) {
  return str.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, (words) => {
    let word = words.replace(/\#|\;/gi, '')
    let index = emotions.emotionList.indexOf(word)
    if (index !== -1) {
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
    } else {
      return words
    }
  })
}
/**
 * 根据字符串返回特定的颜色
 * @param {String}} str 
 */
export function getStrColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = 31 * hash + str.charCodeAt(i);
  }
  return colors[Math.abs(hash % colors.length)]
}