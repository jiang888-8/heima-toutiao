<template>
  <div>
    <van-icon
      :color="value ? '#3296fa' : '#777'"
      :name="value ? 'star' : 'star-o'"
      @click="onCollected"
    />
  </div>
</template>

<script>
import { addCollected, removeCollected } from '@/api/article.js'
import { Toast } from 'vant'
export default {
  data () {
    return {

    }
  },

  props: {
    value: {
      type: Boolean,
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
    async onCollected () {
      try {
        if (this.value) {
        // 取消收藏
          await removeCollected(this.artId)
          Toast.success('取消收藏')
        } else {
        // 收藏
          await addCollected(this.artId)
          Toast.success('收藏成功')
        }
        this.$emit('input', !this.value)
      } catch (error) {
        Toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
