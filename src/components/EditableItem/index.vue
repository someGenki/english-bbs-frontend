<template>
  <!-- 自定义的组件,用于展示一个信息字段,并附带操作按钮 -->
  <div class="item">
    <!-- 字段跟值 值带一个插槽 -->
    <div class="fv">
      <div class="field">
        <h2 :class="fieldFloat?'left':null">{{data.chinese}}</h2>
        <p v-html="'<b>描述:</b> '+data.remark" class="remark" v-if="data.remark"></p>
      </div>
      <div class="value">
        <slot name="show">
          <span v-if="flag">{{val}}</span>
          <input
            v-else
            :value="val"
            class="simple-input animate__animated"
            :class="{'animate__shakeX':shake}"
            ref="input"
            :type="leixing"
          />
        </slot>
      </div>
    </div>
    <!-- 操作,带一个插槽 -->
    <div class="operation" v-if="editable">
      <slot name="operation">
        <button v-if="flag" @click="edit()" class="simple-btn">编辑</button>
        <div v-else>
          <button @click="save()" class="simple-btn">确认</button>
          <button @click="quit()" class="simple-btn">放弃</button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { isDateformat, isQqNum } from '@/utils/check.js'
export default {
  name: 'BaseItem',
  props: {
    editable: { type: Boolean, default: true },
    // 主要数据包括字段名字(chinese)字段的属性(value)
    // 字段的数据库列名(english)描述(可选,remark)
    data: { type: Object, required: true },
    // 是否浮动字段
    fieldFloat: { type: Boolean, default: false },
    handleSave: { type: Function },
    type: { type: String },
    // 输入框类型
    leixing: { type: String, default: 'text' },
  },
  data() {
    return {
      flag: true, // true是span false为input
      val: this.data.value, // span显示的值
      shake: false, //输入框是否x轴晃动
    }
  },
  methods: {
    // operation
    save() {
      let tmp = this.$refs.input.value
      // 校验日期 校验qq号
      if (this.data.english == 'birthday') {
        let x = isDateformat(tmp)
        if (x == false) {
          this.shake = true
          setTimeout(() => {
            // 取消晃动样式
            this.shake = false
          }, 800)
          return this.$message.error('日期格式必须为yyyy-MM-dd')
        }
      }
      if (this.data.english == 'qqnum') {
        let x = isQqNum(tmp)
        if (x == false) return this.quit('qq格式错误')
      }
      // 如果输入未变更则不调用api
      if (tmp == this.data.value) {
        return this.quit()
      }
      this.handleSave({ key: this.data.english, value: tmp })
      this.val = this.$refs.input.value
      this.flag = true
    },
    quit(msg) {
      if (msg) this.$message.error(msg)
      this.flag = true
    },
    edit() {
      this.flag = false
      // 使用vue的refs点击编辑按钮使输入框获得焦点nextTick必要,因为dom的更新顺序问题!
      // 因为必须input的display!=none才能获得焦点
      // api介绍:在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
// 主样式
.item {
  border-bottom: 1px solid #e4e1e1;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .fv {
    flex: 1;
  }
}
.simple-btn {
  color: blue;
  background: none;
  cursor: pointer;
  border: none;
  &:focus {
    background: rgba(0, 0, 0, 0.03);
    outline: 0;
  }
}
.simple-input {
  background: none;
  width: 100%;
  border: 1px solid #b7c3d1;
  border-radius: 4px;
  &:focus {
    outline: 1px solid #a4bbd4;
    border-radius: 0px;
  }
}

.left {
  float: left;
  margin-right: 20px;
}
.remark {
  margin-bottom: 10px;
}
</style>