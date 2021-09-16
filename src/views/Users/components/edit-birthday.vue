<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('cancel')"
      @confirm='confirm'
    />
  </div>
</template>

<script>
import { formats } from '@/filters/filters.js'
import { updateUserProfile } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
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
    async confirm (val) {
      const time = formats(val)
      try {
        await updateUserProfile({
          birthday: time
        })
        Toast.success('修改成功')
        this.$emit('cancel')
        this.$emit('input', time)
      } catch (error) {
        Toast.fail('修改失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
