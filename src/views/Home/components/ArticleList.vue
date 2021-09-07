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
          <van-cell v-for="item in list" :key="item.art_id" :title="item.title" value="内容" size="large" >
            <template #label>
              <div class="label-box">
                <span>作者</span>
                <span>作者</span>
                <span>作者</span>
              </div>
            </template>
          </van-cell>
        </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
import { Toast } from 'vant'
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
  padding-bottom: 100px;
}
.label-box {
  span:nth-child(2) {
    margin: 0 8px;
  }
}
</style>
