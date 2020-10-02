<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input-password
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
      </a-input-password>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
      >Remember me
      </a-checkbox>
      <a class="login-form-forgot" href>Forgot password</a>
      <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>
      Or
      <a href>register now!</a>
    </a-form-item>
    <third/>
  </a-form>
</template>

<script>
import Third from './third-party.vue'

export default {
  name: 'LoginForm',
  components: {
    Third: Third,
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'normal_login'})
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // 接受返回值,可以用于该页面的其他操作
          this.$emit('login', true)
          setTimeout(() => {
            let x = this.$store
              .dispatch('user/login', {
                vue: this,
                val: values,
              })
              .then((res) => {
                if (res == false) this.$emit('login', false)
              })
          }, 800)
        }
      })
    },
  },
}
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 80%;
  margin-right: 10%;
  margin-left: 10%;
}
</style>