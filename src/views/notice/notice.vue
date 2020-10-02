<template>
  <div id="notice">
    <a-tabs v-if="show" type="card" :tabBarGutter="10" @change="handleChange">
      <a-tab-pane key="4" tab="评论">
        <div class="notice-card"
             v-for="(item,index) in commentNoticeList"
             :key="item.id"
             :id="'notice:'+item.id"
        >
          <a class="title"
             :href="item.link"
             target="_blank">{{ item.title }}</a>
          <p>{{ item.content }}</p>
          <span class="date">{{ moment(item.gmtCreate, 'YYYY-MM-DDTHH:mm:ss').fromNow() }}</span>
          <span class="opt" @click.prevent="readNotice(item.id,index)"><a-icon type="check"/>确认</span>
        </div>
        <a-empty v-if="commentNoticeList.length===0"/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="点赞">
        <a-empty/>
      </a-tab-pane>
      <a-tab-pane key="1" tab="系统通知">
        <a-empty/>
      </a-tab-pane>
      <a-button @click="readNotice(0)" slot="tabBarExtraContent">
        全部已读
      </a-button>
    </a-tabs>
  </div>
</template>

<script>
import {bespreadDiv} from "@/utils/common";
import moment from "moment";

export default {
  name: "notice.vue",
  data() {
    return {
      moment,
      bespreadDiv,
      show: false,
      commentNoticeList: [],
      likeNoticeList: [],
      systemNoticeList: [],
    }
  },
  created() {
    this.$api.getNotice().then(res => {
      res.data.forEach(element => {
        element.link = this.makeLink(element.itemType, element.itemId)
        if (element.type === 4) {
          this.commentNoticeList.push(element)
        } else if (element.type === 2) {
          this.likeNoticeList.push(element)
        } else if (element.type === 1) {
          this.systemNoticeList.push(element)
        } else console.log("unknown")
      })
      this.show = true
    })
  },

  mounted() {
    this.bespreadDiv("#notice")
  },
  methods: {
    handleChange(activeKey) {
      console.log(activeKey)
    },
    // 读取通知
    readNotice(id) {
      this.$api.readNotice(id).then(res => {
          if (res.code === 200) {
            this.$message.success("操作成功");
            if (id !== 0) {
              this.commentNoticeList.splice((this.commentNoticeList.findIndex(e => e.id === id)), 1)
            } else {
              // 全部已读情况
              this.commentNoticeList = []
            }
          } else {
            this.$message.warning("操作失败")
          }
        }
      )
    },
    // 根据资源的类型和id生成一个链接，不带域名
    makeLink(itemType, itemId) {
      switch (itemType) {
        // case 1:
        case 4:
          return '/post/' + itemId;
        case 3:
          return '/article/' + itemId;
        default:
          return 'https://www.baidu.com';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#notice {
  max-width: 1000px;
  margin: auto;
  height: 100%;
}

.notice-card {
  display: block;
  min-height: 40px;
  margin-bottom: 10px;
  padding: 5px 10px;

  border-radius: 4px;
  background-color: #a8d8ea;

  &:hover {
    background-color: #a8d8ea;
    color: #40514e;

    > .opt {
      display: inline-block;
    }
  }

  > .title {
    font-size: 1.05rem;
    font-weight: bold;
  }

  > .date {
    margin-right: 10px;
  }

  > .opt {
    display: none;

    &:hover {
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>