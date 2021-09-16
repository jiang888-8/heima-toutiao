<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <input type="file" hidden ref="file" @change="inputChacge">
    <van-cell @click="$refs.file.click()" title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="users.photo"
      />
    </van-cell>
    <van-cell title="昵称" @click="isShowEditNickname = true" :value="users.name" is-link />
    <van-cell title="性别" @click="isShowEditGender = true" :value="users.gender ? '女' : '男'" is-link />
    <van-cell title="生日" @click="isShowEditBirthday = true" :value="users.birthday" is-link />

    <van-popup v-model="isShowEditNickname" position="bottom" :style="{ height: '100%' }">
      <EditNickname v-if="isShowEditNickname" v-model="users.name" @click-left='isShowEditNickname =false' />
    </van-popup>
    <van-popup v-model="isShowEditGender" position="bottom" :style="{ height: '50%' }">
      <EditGender v-if="isShowEditGender" v-model="users.gender" @cancel='isShowEditGender = false' />
    </van-popup>
    <van-popup v-model="isShowEditBirthday" position="bottom" :style="{ height: '50%' }">
      <EditBirthday v-if="isShowEditBirthday" v-model="users.birthday" @cancel='isShowEditBirthday = false' />
    </van-popup>
    <van-popup v-model="isShowEditAvatar" position="bottom" :style="{ height: '100%' }">
      <EditAvatar v-if="isShowEditAvatar" :img='imgSrc' @on-click='users.photo = $event' @cancel='isShowEditAvatar = false' />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import EditNickname from './components/edit-nickname.vue'
import EditGender from './components/edit-gender.vue'
import EditBirthday from './components/edit-birthday.vue'
import EditAvatar from './components/edit-avatar.vue'
export default {
  data () {
    return {
      users: {},
      isShowEditNickname: false,
      isShowEditGender: false,
      isShowEditBirthday: false,
      isShowEditAvatar: false,
      imgSrc: ''
    }
  },

  components: {
    EditNickname,
    EditGender,
    EditBirthday,
    EditAvatar
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
    },

    inputChacge (e) {
      this.isShowEditAvatar = true
      const file = e.target.files[0]
      this.imgSrc = URL.createObjectURL(file)
      e.target.value = ''
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
