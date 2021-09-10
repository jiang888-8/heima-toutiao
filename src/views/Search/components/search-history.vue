<template>
  <div class="search-history-container">
    <van-cell title="搜索历史">
      <template>
        <div class="right">
          <span>全部删除</span>
          <span>完成</span>
        </div>
        <van-icon name="delete-o" />
      </template>
    </van-cell>

    <van-cell title="黑马">
      <template>
        <van-icon name="close" />
      </template>
    </van-cell>
    <van-cell title="黑马">
      <template>
        <van-icon name="close" />
      </template>
    </van-cell>
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
.search-history-container {
  .van-cell {
    .right {
      span:nth-child(1) {
        margin-right: 8px;
      }
    }
  }
}
</style>
