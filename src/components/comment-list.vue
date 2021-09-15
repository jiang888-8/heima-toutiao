<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check='false'
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <CommentItem @click-reply="$emit('click-reply',$event)" v-for="item in list" :key="item.com_id + ''" :row='item' />
    </van-list>
  </div>
</template>

<script>
import { getComment } from '@/api/article.js'
import CommentItem from './comment-item.vue'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
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
    },
    list: {
      type: Array,
      required: true
    }
  },

  components: {
    CommentItem
  },

  created () {
    this.onLoad()
  },

  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 发送请求
      try {
        const res = await getComment({
          type: this.type,
          source: this.source + '',
          limit: this.limit,
          offset: this.offset
        })
        //
        this.$emit('updataTotal', res.total_count)
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
      } catch (err) {
        console.dir(err)
        this.error = true
      }
    }
  }
}
</script>

<style scoped>

</style>
