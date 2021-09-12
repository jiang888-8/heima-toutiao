<template>
  <div class="search-history-container">
    <van-cell title="搜索历史">
      <template>
        <div class="right" v-if="isDel">
          <span @click="history.splice(0)">全部删除</span>
          <span @click="isDel = false">完成</span>
        </div>
        <van-icon @click="isDel = true" name="delete-o" v-else />
      </template>
    </van-cell>

    <van-cell @click="onClickHistoryItem(index)" v-for="(item,index) in history" :key="item" :title="item">
      <template>
        <van-icon name="close" v-if="isDel" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDel: false
    }
  },

  props: {
    history: {
      type: Array,
      required: true
    }
  },

  created () {

  },

  methods: {
    onClickHistoryItem (index) {
      if (this.isDel) {
        this.history.splice(index, 1)
      } else {
        this.$emit('search', this.history[index])
      }
    }
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
