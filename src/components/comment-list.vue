<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.com_id + ''" :title="item.content" />
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/article.js'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },

  props: {
    type: {
      type: String,
      default: 'a'
    },
    source: {
      type: [Number, Object, String],
      required: true
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 发送请求
      const res = await getComment({
        type: this.type,
        source: this.source + '',
        limit: this.limit,
        offset: this.offset
      })
      console.log(res)

      // 保存数据
      this.list.push(...res.results)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (!res.last_id) {
        this.finished = true
      } else {
        this.offset = res.last_id
      }
    }
  }
}
</script>

<style scoped>

</style>
