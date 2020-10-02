// event-bus传值
// 1. 建立even.js然后导出vue实例
// 2. 然后再需要的组件导入: import event from '@/event.js'
// 3. 要传递的组件用 event.$emit("event1",this.xxx)
// 4. 要接收的组件用 event.$on("event1",(xxx)=>{ console.log(xxx)})  (created,mounted)
import Vue from 'vue'
export default new Vue()