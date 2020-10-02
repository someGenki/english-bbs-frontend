<template>
  <div class="third-party">
    <span class="text">
      third party login
      <a-tooltip placement="bottom" title="可以选择绑定已有账号">
        <a-icon type="question-circle-o" />
      </a-tooltip>
    </span>
    <ul class="icons">
      <li>
        <a href="https://www.baidu.com">
          <a-icon type="github" theme="filled" />Github
        </a>
      </li>
      <a-tooltip placement="bottom" title="未实现">
        <li>
          <a href>
            <a-icon type="wechat" theme="filled" />WeChat
          </a>
        </li>
      </a-tooltip>
      <a-tooltip placement="bottom" title="未实现">
        <li>
          <a href>
            <a-icon type="qq" />QQ
          </a>
        </li>
      </a-tooltip>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ThirdParty',
  data() {
    return {
      height: '',
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixins/_xuanting.scss';
.third-party {
  min-height: 40px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.text {
  font-size: 16px;
  font-weight: 500;
}
.icons {
  display: flex;
  li {
    @include xuanting();
    margin-right: 20px;
    font-size: 1.03rem;
  }
}
</style>