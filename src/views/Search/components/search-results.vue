<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },

  props: {
    searchText: {
      type: String,
      required: true
    }
  },

  created () {

  },

  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 1. 发送请求
      // 2. 保存数据
      // 3. 加载状态结束
      // 4. 数据全部加载完成
      try {
        const { results: res } = await getSearchResults({
          q: this.searchText
        })
        this.list = res
      } catch (error) {
        Toast('加载失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
