<template>
  <div>
    <!-- 导航区域 -->
    <van-nav-bar :title="comment.reply_count ? comment.reply_count + '条回复' : '暂无回复'" >
      <template #left>
        <van-icon @click="$emit('close-reply')" name="cross" />
      </template>
    </van-nav-bar>

    <!-- 内容 -->
    <div class="scroll-center">
      <CommentItem :row='comment' />

      <van-cell title='全部回复' />
      <CommentList type='c' :source='comment.com_id' :list='list' />
    </div>

    <!-- 底部按钮 -->
    <div class="post-warp">
      <van-button round @click="isShowReplyPost = true">评论</van-button>
    </div>

    <!-- 弹出层 -->
    <van-popup v-model="isShowReplyPost" position="bottom" :style="{ height: '18%' }">
      <CommentPost @on-post-success='onPostSuccess' :target="comment.com_id" :artId="$route.params.ArticleId" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/components/comment-item.vue'
import CommentList from '@/components/comment-list.vue'
import CommentPost from './commentPost.vue'
export default {
  data () {
    return {
      list: [],
      isShowReplyPost: false
    }
  },

  props: {
    comment: {
      type: Object,
      required: true
    }
  },

  components: {
    CommentItem,
    CommentList,
    CommentPost
  },

  created () {

  },

  methods: {
    onPostSuccess (val) {
      this.list.unshift(val)
      this.isShowReplyPost = false
    }
  }
}
</script>

<style scoped lang='less'>
.post-warp {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: plum;

  .van-button {
    width: 640px;
    height: 80px;
  }
}

.scroll-center {
  position: absolute;
  top: 92px;
  bottom: 102px;
  width: 100%;
  overflow-y: scroll;
}
</style>
