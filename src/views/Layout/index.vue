<template>
  <div class="layout-container">
    <router-view />

    <!-- 底部标签栏n -->
    <!--路由占位  -->
    <van-tabbar rotue>
      <van-tabbar-item to="/home" icon="home-o">
        <!-- 默认插槽 -->
        <span>首页</span>
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/video" icon="search">
        <!-- 默认插槽 -->
        <span>视频</span>
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/qa" icon="friends-o">
        <!-- 默认插槽 -->
        <span>问答</span>
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/profile" icon="setting-o">
        <!-- 默认插槽 -->
        <span>我的</span>
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang='less'>
.layout-container {
  .van-tabbar {
    .toutiao {
      font-size: 38px;
    }
  }
}
</style>
