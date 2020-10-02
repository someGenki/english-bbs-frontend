/**
 * 函数防抖
 * 问题 在vue中,没能清理掉旧的计时器
 * 使用
 *  import { debounce } from '@/utils/common.js'
 *
 handleChange(e) {
      var _this = this
      debounce(function () {
        console.log(e)
        _this.updateUserinfo(e.target.name, e.target.value)
      }, 500)()
    },
 * 参考:https://www.cnblogs.com/TigerZhang-home/p/11812386.html
 */
export function debounce(fn, delay) {
  // 记录上一次的延时器
  var timer = null;
  var delay = delay || 200;
  return function () {
    var args = arguments;
    var that = this;
    // 清除上一次延时器
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(that, args)
    }, delay);
  }
}

//将base64转换为文件
export function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type: mime})
}

/**
 * 铺满一个div在可视页面内（高度拉伸）
 */
export function bespreadDiv(selector, resize = false, offset = 120) {
  let height = document.body.clientHeight - offset
  let node = document.querySelector(selector)
  node.style.minHeight = height + 'px'
  if (resize) {
    window.onresize = () => {
      try {
        bespreadDiv(selector, true)
      } catch (e) {
        window.onresize = () => {
        }
      }
    }
  }

}

export function test() {
  console.log("test");
}