<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="$emit('click-left')"
      @click-right="onSave"
    />

    <van-field
      v-model.trim="message"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      message: this.value
    }
  },

  props: {
    value: {
      type: String,
      required: true
    }
  },

  created () {

  },

  methods: {
    async onSave () {
      if (this.message === '') return Toast('请输入昵称')
      try {
        await updateUserProfile({
          name: this.message
        })
        Toast.success('更新成功')
        this.$emit('click-left')
        this.$emit('input', this.message)
      } catch (err) {
        if (err.response && err.response.status === 409) {
          return Toast.fail('昵称已存在')
        }
        Toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
