<template>
  <!-- 首页/帖子列表 -->
  <a-row id="index" class="content">
    <a-col class="main" :lg="18">
      <div class="nav2">
        <router-link
          :to="`/index?tab=${fen.value}`"
          class="fenlei"
          v-for="fen in postCategory"
          :key="fen.value"
          :class="currentTab===fen.value?'my-active':null "
        >{{ fen.name }}
        </router-link>
      </div>
      <a-list
        item-layout="vertical"
        size="large"
        :pagination="pagination"
        :data-source="processedList"
      >
        <a-list-item slot="renderItem" key="item.title" slot-scope="item">
          <!-- 卡片底部收藏点赞数量展示 -->
          <template v-for="{ type, text } in item.actions" slot="actions">
            <span :key="type">
              <a-icon :type="type" style="margin-right: 8px"/>
              {{ text }}
            </span>
          </template>
          <img
            v-if="false"
            slot="extra"
            width="272"
            alt="logo 留着备用"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
          <a-list-item-meta>
            <a slot="title" :href="item.href">
              <span class="poster">{{ item.nickname }}：</span>
              <a-tag color="green">{{ item.category }}</a-tag>
              <span class="title">
                {{ item.title }}
                <a-icon type="paper-clip" v-show="item.hasAttachment"/>
              </span>
            </a>
            <a :href="'/space/'+item.uid" slot="avatar">
              <a-avatar
                :style="{ backgroundColor: item.color, verticalAlign: 'middle' }"
                :src="item.avatar"
              >{{ item.nickname }}
              </a-avatar>
            </a>
          </a-list-item-meta>
          <div class="post-content">{{ item.content }}</div>
        </a-list-item>
      </a-list>
    </a-col>
    <a-col class="sticky" :md="0" :sm="0" :xs="0" :lg="6">
      <qiandao-card/>
      <advertising/>
    </a-col>
  </a-row>
</template>

<script>
import QiandaoCard from '@/components/CheckIn/qiandao-card.vue'
import Advertising from '@/components/Advertising/index.vue'
import category from "@/assets/js/Category";
import {getStrColor} from '@/utils/process.js'

export default {
  name: 'index',
  components: {
    QiandaoCard, Advertising
  },
  data() {
    return {
      postCategory: category.post,
      getStrColor,
      // 分页配置 还有地址栏要记录当前页码，不然返回还是第一页
      pagination: {
        pageSize: 7,
        hideOnSinglePage: true,
        total: 0,
        onChange: (page) => {
          this.getPostList(page, 7)
        },
      },
      postList: [], // 保存后端请求来的post 集合数据
    }
  },
  created() {
    this.getPostList(1, 7, this.$route.query.tab)
  },
  methods: {
    getPostList(num, size, category) {
      this.$api.getPostList(num, size, category).then((res) => {
        this.postList = res.data.records
        this.pagination.total = res.data.total
      })
    },
  },
  computed: {
    currentTab() {
      return this.$route.query.tab === null ? 'default' : this.$route.query.tab
    },
    processedList() {
      return this.postList.map((item) => {
        return {
          href: '/post/' + item.id,
          nickname: item.nickname,
          title: item.title,
          avatar: item.avatar,
          description: 'null!',
          content: item.content.substr(0, 60), // 后端当时没获取content。。。 TODO 暂时这么写
          hasAttachment: !!item.attachment,
          category: item.category, // TODO cate处理：英文变中文
          actions: [
            {type: 'eye', text: item.pv},
            {type: 'like-o', text: item.likes},
            {type: 'message', text: item.comments},
          ],
          color: this.getStrColor(item.nickname),
          uid: item.uid,
        }
      })
    },
  },
  beforeRouteUpdate(to, from, next) {
    let cate = to.query.tab
    this.postList = []
    this.getPostList(1, 7, cate)
    next()
  },
}
</script>

<style lang="scss" scoped>
/* 二级导航 */
.nav2 {
  border-bottom: 1px solid #ddd;
  height: 48px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .fenlei {
    padding: 2px;
    cursor: pointer;
  }
}

/* 内容布局 */
.content {
  max-width: 1200px;
  margin: 0 auto;

  > .main {
    padding-right: 10px;
  }
}

.ant-list-item-meta-description {
  color: rgba(0, 0, 0, 0.65);
}

.ant-list-vertical .ant-list-item-meta {
  margin-bottom: 5px;
}

.poster {
  border-bottom: none;
}

.sticky {
  position: sticky;
  top: 75px;
}

.title {
  font-weight: bold;
}
</style>