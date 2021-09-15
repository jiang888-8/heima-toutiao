<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="users.photo"
      />
    </van-cell>
    <van-cell title="昵称" @click="isShowEditNickname = true" :value="users.name" is-link />
    <van-cell title="性别" :value="users.gender" is-link />
    <van-cell title="生日" :value="users.birthday" is-link />

    <van-popup v-model="isShowEditNickname" position="bottom" :style="{ height: '100%' }">
      <EditNickname />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import EditNickname from './components/edit-nickname.vue'
export default {
  data () {
    return {
      users: {},
      isShowEditNickname: false
    }
  },

  components: {
    EditNickname
  },

  created () {
    this.loadUserProfile()
  },

  methods: {
    async loadUserProfile () {
      try {
        const res = await getUserProfile()
        this.users = res
      } catch (error) {

      }
    }
  }
}
</script>

<style scoped lang='less'>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
