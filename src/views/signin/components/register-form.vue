<template>
  <a-form :form="form" layout="vertical" @submit="handleSubmit">
    <a-form-item has-feedback>
      <span slot="label">
        Username&nbsp;
        <a-tooltip placement="bottomLeft" title="用于登录以及作为默认昵称😉">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
      <a-input
        v-decorator="['username',{rules:[
      {
      required: true,
      message: 'Please input your username!',
      },{
      validator:usernameValidator,trigger:'blur',
      }
      ]}]"
      />
    </a-form-item>
    <a-form-item label="Password" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item label="Confirm Password" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
    <a-form-item>
      <a-checkbox v-decorator="['agreement', { valuePropName: 'checked',initialValue: true }]">
        I have read the
        <a href="javascript:void(0)">agreement</a>
      </a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button">register</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'RegisterForm',
  data() {
    return {
      confirmDirty: false,
    }
  },
  beforeCreate() {
    // antd 创建表单方式
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  methods: {
    ...mapMutations({
      updateToken: 'user/updateToken',
    }),
    // 提交表单
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.$store.dispatch('user/register', { vue: this, val: values })
        }
      })
    },
    // 判断用户名是否已被使用
    async usernameValidator(rule, value, callback) {
      const regex = /^[A-Za-z\d_]+$/
      if (value.length < 4) callback('The username length must be at least 4')
      else if (value.length > 20)
        callback('The username length is less than 20')
      else if (!regex.test(value))
        callback(
          'Username can contain only letters, Numbers, or the underscore character'
        )
      else {
        const data = await this.$api.exist('username', value)
        if (data.code !== 200) callback('The username has been used')
        else callback()
      }
    },
    // 密码校验
    validateToNextPassword(rule, value, callback) {
      if (value.length < 4) callback('Password length is less than 4')
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    // 比较两次密码
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!')
      } else {
        callback()
      }
    },
    // 失去焦点时,设置confirmDirty
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
  },
}
</script>

<style lang="scss" scoped>
.login-form-button {
  // width:100%;
  width: 80%;
  margin-right: 10%;
  margin-left: 10%;
}
</style>