<template>
  <div>
    <van-icon
      :color="value === 1 ? '#3296fa' :' #777'"
      :name="value === 1 ? 'good-job': 'good-job-o'"
      @click="onLikes"
    />
  </div>
</template>

<script>
import { getLikes, removeLikes } from '@/api/article.js'
import { Toast } from 'vant'
export default {
  data () {
    return {

    }
  },

  props: {
    value: {
      type: Number,
      required: true
    },
    artId: {
      type: [Number, Object],
      required: true
    }
  },

  created () {

  },

  methods: {
    async onLikes () {
      try {
        if (this.value !== 1) {
          await getLikes(this.artId)
          this.$emit('input', 1)
          Toast.success('点赞成功')
        } else {
          await removeLikes(this.artId)
          this.$emit('input', -1)
          Toast.success('取消点赞')
        }
      } catch (error) {
        Toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
