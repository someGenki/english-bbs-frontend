<template>
  <a-card
    class="qd-card"
    :tab-list="tabListNoTitle"
    :active-tab-key="noTitleKey"
    @tabChange="key => onTabChange(key)"
  >
    <!-- 签到操作 -->
    <div class="qd" v-if="noTitleKey === 'qian'">
      <button v-show="!hasQiandao" class="qd-btn" @click="userSign">签到!</button>
      <transition enter-active-class="animate__animated animate__fadeInDownBig">
        <a-descriptions
          :bordered="true"
          :column="2"
          size="small"
          layout="vertical"
          v-if="showSignResult"
          v-show="hasQiandao"
        >
          <template v-slot:title>
            <span style="display:none" @click="qiandaoResult=!qiandaoResult">点击折叠或展开</span>
          </template>
          <!--          积分暂时写死-->
          <a-descriptions-item label="获得积分">+{{ qiandaoInfo.signPoint + 5 || 0 + 5 }}</a-descriptions-item>
          <a-descriptions-item label="签到结果">{{ !qiandaoInfo.signResult ? '签到成功' : '已签到' }}</a-descriptions-item>
          <a-descriptions-item label="今日签到排名">{{ qiandaoInfo.signRank }}</a-descriptions-item>
          <a-descriptions-item label="本月首次签到日期">{{ qiandaoInfo.firstSignDate }}</a-descriptions-item>
          <a-descriptions-item label="当月总签到次数">{{ qiandaoInfo.signCount }}</a-descriptions-item>
          <a-descriptions-item label="至今连续签到次数">{{ qiandaoInfo.signContNow }}</a-descriptions-item>
          <a-descriptions-item label="至今总签到次数">{{ qiandaoInfo.signContAll }}</a-descriptions-item>
          <a-descriptions-item label="最大连续签到次数">{{ qiandaoInfo.signContMax }}</a-descriptions-item>
        </a-descriptions>
      </transition>
    </div>
    <!-- 签到排行 -->
    <div v-if="loadRank" class="rank" v-show="noTitleKey === 'info'">
      <span class="tongji">
        今日签到人数:{{ 1 }}
        <a-divider type="vertical"/>
        本月签到人数:{{ 2 }}
      </span>
      <a-tabs>
        <a-tab-pane key="1" tab="总签到次数">
          <a-list item-layout="horizontal" :data-source="rankData.allSignRank">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="'共计'+item.times+'次签到'">
                <router-link slot="title" :to="'/space/'+item.uid">{{ item.nickname }}</router-link>
                <a-avatar slot="avatar" icon="user" :src="item.avatar"/>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
        <a-tab-pane key="2" tab="连续签到次数">
          <a-list item-layout="horizontal" :data-source="rankData.nowSignRank">
            <!-- 0次签到判断 -->
            <a-list-item v-show="item.times!=-1" slot="renderItem" slot-scope="item">
              <a-list-item-meta :description="'连续'+item.times+'次签到'">
                <router-link slot="title" :to="'/space/'+item.uid">{{ item.nickname }}</router-link>
                <a-avatar slot="avatar" icon="user" :src="item.avatar"/>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-tab-pane>
      </a-tabs>
    </div>
    <!-- <a slot="tabBarExtraContent" href="#">关于</a> -->
  </a-card>
</template>

<script>
export default {
  name: 'QianDaoCard',
  data() {
    return {
      tabListNoTitle: [
        {
          key: 'qian',
          tab: '今日签到',
        },
        {
          key: 'info',
          tab: '签到排行榜',
        },
      ],
      noTitleKey: 'qian', // 当前选中的卡片的标签页
      hasQiandao: false, //是否已经签到
      qiandaoInfo: null, //用户签到信息
      loadRank: false, //是否加载排行榜
      showSignResult: false, //展示签到结果
      qiandaoResult: true, // 签到结果
      rankData: null, //排行榜数据
    }
  },
  methods: {
    onTabChange(key) {
      if (key === 'info' && this.loadRank === false) {
        this.$api.signInfo().then((res) => {
          this.rankData = res.data
          this.loadRank = true
        })
      }
      this['noTitleKey'] = key
    },
    userSign() {
      // 判断登录
      if (this.$store.getters['user/login'] === false) {
        return this.$message.warning('此操作需要登录')
      }
      this.$api.userSign().then((res) => {
        if (res.code === 200) {
          this.qiandaoInfo = res.data
          this.showSignResult = true
          this.hasQiandao = true
        }
      })
    },
  },
  created() {
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixins/_button.scss';

.qd-card {
  background-color: transparent;

  ::v-deep .ant-tabs-nav {
    font-size: 14px;
  }

  ::v-deep .ant-descriptions-title {
    margin-bottom: 10px;
    font-size: 14px;
  }

  ::v-deep
  .ant-descriptions-bordered.ant-descriptions-small
  .ant-descriptions-item-content {
    padding: 6px 8px;
  }

  ::v-deep
  .ant-descriptions-bordered.ant-descriptions-small
  .ant-descriptions-item-label {
    padding: 6px 8px;
  }

  ::v-deep .ant-tabs .ant-tabs-large-bar .ant-tabs-tab {
    padding: 16px 0;
    border: none;
  }

  .qd {
    margin-top: -20px;

    > .qd-btn {
      display: block;
      margin: 20px auto;
      width: 100px;
      height: 40px;
      @include bubble();
    }
  }

  .rank {
    margin-top: -20px;

    > .tongji {
      display: inline-block;
      width: 100%;
      text-align: center;
      margin-bottom: 5px;
    }
  }
}

.ant-list-item {
  padding: 5px 0;
}
</style>