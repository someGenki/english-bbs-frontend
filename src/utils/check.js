/*
字符串判断:https://www.jb51.net/article/86543.htm
*/
export function isEmpty(obj) {
  return typeof obj == "undefined" || obj == null || obj === "";
}
export function isDateformat(str) {
  var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/)
  if (r == null) return false
  var d = new Date(r[1], r[3] - 1, r[4])
  return (
    d.getFullYear() === r[1] && d.getMonth() + 1 === r[3] && d.getDate() === r[4]
  )
}
export function isQqNum(str) {
  var r = /^\s*[.0-9]{5,11}\s*$/;
  return r.test(str)
}
// 判断字符串是否以xxx开头
export function isXxxFront(xxx, str) {
  if (!isEmpty(str)) {
    return new RegExp(`${xxx}.*$`).test(str)
  } else {
    return false
  }
}
// 判断字符串削去两端的空格后是否为空
export function isBlank(str) {
  if (str == null || str.trim() == '') return true
  else return false
}