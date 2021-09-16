<template>
  <div class="update-avatar">
    <img :src="img" ref='img' />
    <div class="toolbar">
      <span @click="$emit('cancel')">取消</span>
      <span @click="onSave">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserAvatar } from '@/api/user.js'
import { Toast } from 'vant'
export default {
  data () {
    return {

    }
  },

  props: {
    img: {
      type: String,
      required: true
    }
  },

  created () {

  },

  mounted () {
    const img = this.$refs.img
    this.cropper = new Cropper(img, {
      aspectRatio: 1,
      background: false,
      cropBoxMovable: false,
      cropBoxResizable: false,
      viewMode: 1,
      dragMode: 'move',
      autoCropArea: 1
    })
  },

  methods: {
    onSave () {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData()
        formData.append('photo', blob)

        try {
          const res = await updateUserAvatar(formData)
          Toast.success('裁剪成功')
          this.$emit('cancel')
          this.$emit('on-click', res.photo)
        } catch (error) {
          Toast.fail('裁剪失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
