<template>
  <div class="articleList">

    <van-pull-refresh :success-text="pullRefreshText" v-model="isPullLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <article-item v-for="item in list" :key="item.art_id + ''" :articleItem='item'></article-item>
        </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
import { Toast } from 'vant'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      preTimestamp: null,
      error: false,
      isPullLoading: false,
      pullRefreshText: ''
    }
  },

  components: {
    ArticleItem
  },

  props: {
    channelId: {
      type: Number,
      required: true
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      try {
        // 发送请求
        const res = await getArticleList({
          channel_id: this.channelId,
          timestamp: this.preTimestamp || Date.now(),
          with_top: 0
        })
        // if (Math.random() > 0.5) {
        //   console.lg('11')
        // }
        this.list.push(...res.results)
        this.preTimestamp = res.pre_timestamp
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (!res.pre_timestamp) {
          this.finished = true
        }
      } catch (err) {
        Toast.clear()
        // 加载状态结束
        this.loading = false
        this.error = true
      }
    },

    async onRefresh () {
      try {
        // 发送请求
        const res = await getArticleList({
          channel_id: this.channelId,
          timestamp: Date.now(),
          with_top: 0
        })
        // if (Math.random() > 0.5) {
        //   console.lg('11')
        // }
        this.list.unshift(...res.results)
        this.isPullLoading = false
        this.pullRefreshText = '共刷新' + res.results.length + '条信息'
      } catch (err) {
        this.isPullLoading = false
        this.pullRefreshText = '网络异常，刷新失败'
      }
    }
  }
}
</script>

<style scoped lang='less'>
.articleList {
  height: 80vh;
  overflow: scroll;
}
</style>
