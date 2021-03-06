<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.aut_photo">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | formatDate}}</div>
          <FollowUser v-model='article.is_followed' :autId='article.aut_id' />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <!-- markdown-body css需要的属性 -->
        <div class="article-content" ref="content" markdown-body v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <CommentList @click-reply='onClickReply' :list='list' @updataTotal='totalCont = $event' :source='article.art_id' />
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if='is404'>
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticleInfo">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom" v-if="article.aut_id">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isShowPostComment = true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :badge="totalCont"
        color="#777"
      />
      <ArticleCollected v-model="article.is_collected" :artId='article.art_id' />
      <ArticleLike v-model="article.attitude" :artId='article.art_id' />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 发布评论 -->
    <van-popup v-model="isShowPostComment" position="bottom" :style="{ height: '18%' }">
      <CommentPost @on-post-success='onPostSuccess' :target="ArticleId" />
    </van-popup>
    <!-- 回复评论 -->
    <van-popup v-model="isShowPostReplyComment" position="bottom" :style="{ height: '100%' }">
      <CommentReply v-if="isShowPostReplyComment" @close-reply='isShowPostReplyComment = false' :comment='comment' />
    </van-popup>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article.js'
import { ImagePreview } from 'vant'
import './github-markdown.css'
import FollowUser from '@/components/followUser.vue'
import ArticleCollected from '@/components/articleCollected.vue'
import CommentList from '@/components/comment-list.vue'
import ArticleLike from '@/components/articleLike.vue'
import CommentPost from './components/commentPost.vue'
import CommentReply from './components/comment-reply.vue'
export default {
  data () {
    return {
      article: {},
      isLoading: true,
      is404: false,
      totalCont: 0,
      isShowPostComment: false,
      isShowPostReplyComment: false,
      list: [],
      comment: {}
    }
  },

  components: {
    FollowUser,
    ArticleCollected,
    CommentList,
    ArticleLike,
    CommentPost,
    CommentReply
  },

  props: {
    ArticleId: {
      type: String,
      required: true
    }
  },

  created () {
    this.loadArticleInfo()
  },

  methods: {
    // 放大图片
    async loadArticleInfo () {
      this.isLoading = true
      try {
        const res = await getArticleDetail(this.ArticleId)
        console.log(res)
        this.article = res
        this.isLoading = false
        // 等待视图更新，文章详情加载完成
        this.$nextTick(() => {
          this.prevewImg()
        })
      } catch (err) {
        this.isLoading = false
        if (err.response && err.response.status === 404) {
          this.is404 = true
        }
      }
    },

    prevewImg () {
      const contentEl = this.$refs.content
      const imgs = contentEl.querySelectorAll('img')
      const images = []
      imgs.forEach((item, index) => {
        images.push(item.src)
        item.onclick = function () {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },

    // 添加评论
    onPostSuccess (obj) {
      this.isShowPostComment = false
      this.list.unshift(obj)
    },

    // 回复评论
    onClickReply (comment) {
      this.isShowPostReplyComment = true
      this.comment = comment
    }

  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
