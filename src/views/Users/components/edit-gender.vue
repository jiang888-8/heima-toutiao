<template>
  <div>
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('cancel')"
    />
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      columns: ['男', '女']
    }
  },

  props: {
    value: {
      type: Number,
      required: true
    }
  },

  created () {

  },

  methods: {
    async onConfirm (val, index) {
      try {
        await getUserProfile({
          gender: index
        })
        Toast.success('更新成功')
        this.$emit('cancel')
        this.$emit('input', index)
      } catch (error) {
        Toast.fail('更改失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
