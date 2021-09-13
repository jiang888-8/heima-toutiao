<template>
  <div>
    <van-button
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      v-if="!isFollowed"
      @click="onFollowed"
    >关注</van-button>
    <van-button
      class="follow-btn"
      round
      size="small"
      v-else
      @click="onFollowed"
    >已关注</van-button>
  </div>
</template>

<script>
import { addFollowUser, removeFollowUser } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  data () {
    return {

    }
  },

  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, Object],
      required: true
    }
  },

  model: {
    prop: 'isFollowed',
    event: 'updateFollowed'
  },

  created () {

  },

  methods: {
    // 关注事件
    async onFollowed () {
      try {
        if (this.isFollowed) {
          // console.log('取消关注')
          await removeFollowUser(this.autId)
          Toast.success('取消关注成功')
        } else {
          // console.log('关注')
          await addFollowUser(this.autId)
          Toast.success('关注成功')
        }
        this.$emit('updateFollowed', !this.isFollowed)
      } catch (error) {
        Toast.fail('操作失败,请稍后重试')
      }
    }
  }
}
</script>

<style scoped>

</style>
