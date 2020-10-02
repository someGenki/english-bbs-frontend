<template>
  <div class="userinfo" v-if="show">
    <y-item :data="info[0]" :editable="false">
      <template v-slot:show>
        <a-radio-group
          button-style="solid"
          name="sex"
          @change="handleChange($event)"
          :default-value="info[0].value>2?3:info[0].value"
          size="small"
        >
          <a-radio-button :value="1">男</a-radio-button>
          <a-radio-button :value="2">女</a-radio-button>
          <a-radio-button :value="3">保密</a-radio-button>
        </a-radio-group>
      </template>
    </y-item>
    <y-item
      v-for="(i,index) in info"
      :key="i+index"
      :data="i"
      :handleSave="updateUserinfo"
      :editable="i.editable"
      v-show="!i.noshow"
    ></y-item>
  </div>
</template>

<script>
import yItem from '@/components/EditableItem/index.vue'
import { debounce } from '@/utils/common.js'
const infoExplains = [
  {
    english: 'sex',
    chineses: '性别',
    editable: false,
  },
  {
    english: 'sign',
    chineses: '个人签名',
    editable: true,
  },
  {
    english: 'birthday',
    chineses: '生日',
    editable: true,
  },
  {
    english: 'profession',
    chineses: '专业',
    editable: true,
  },
  {
    english: 'school',
    chineses: '学校',
    editable: true,
  },
  {
    english: 'qqnum',
    chineses: 'QQ',
    editable: true,
  },
  {
    english: 'gmtCreate',
    chineses: '加入时间',
    editable: false,
  },
  {
    english: 'gmtModified',
    chineses: '上次修改时间',
    editable: false,
  },
]
export default {
  name: 'UserProfile',
  components: {
    yItem: yItem,
  },
  mounted() {
    this.$api.getUserinfo(this.$store.state.user.uid).then((res) => {
      for (let i = 0; i < infoExplains.length; i++) {
        let obj = {}
        if (infoExplains[i].english == 'sex') {
          obj.noshow = true
        }
        obj.value = res.data[infoExplains[i].english]
        obj.english = infoExplains[i].english
        obj.chinese = infoExplains[i].chineses
        obj.editable = infoExplains[i].editable
        this.info[i] = obj
      }
      this.show = true
    })
  },
  data() {
    return {
      show: false,
      info: [],
      timer: null,
    }
  },
  methods: {
    // 监听性别单选按钮的改变并使用**防抖**
    handleChange(e) {
      this.$store.commit('debounce', {
        that: this,
        args: { key: e.target.name, value: e.target.value },
        fn: this.updateUserinfo,
      })
    },
    // 更新用户信息
    updateUserinfo(args) {
      const { key, value } = args
      let ok = false
      return this.$api.updateUserinfo(key, value).then((res) => {
        if (res.code == 200) this.$message.success(res.msg)
        else this.$message.error(res.msg)
        return new Promise((resolve, reject) => {
          resolve(true)
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.userinfo {
  max-width: 700px;
}
</style>