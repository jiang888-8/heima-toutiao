<template>
  <div>
    <van-cell :to="'/article/' + articleItem.art_id">
      <!-- 自定义标题 -->
      <template #title>
        <div class="van-multi-ellipsis--l2">
          {{articleItem.title}}
        </div>
      </template>
      <!-- 自定义label -->
      <template #label>
        <div v-if="articleItem.cover.type === 3" class="label-image">
          <van-image
            v-for="(item,index) in articleItem.cover.images"
            :key="index"
            class="right-image"
            fit="cover"
            :src="item"
          />
        </div>
        <div class="label-box">
          <span>{{articleItem.aut_name}}</span>
          <span>{{articleItem.pubdate | formatDate}}</span>
          <span>{{articleItem.com_count}}</span>
        </div>
      </template>
      <!-- 右侧自定义 -->
      <template>
        <van-image v-if="articleItem.cover.type === 1"
          class="right-image"
          fit="contain"
          :src="articleItem.cover.images[0]"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    articleItem: {
      type: Object,
      required: true
    }
  },
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
.label-box {
  span:nth-child(2) {
    margin: 0 8px;
  }
}

.van-cell__value {
  flex: unset;
}

.van-cell__value, .right-image {
  width: 232px;
  height: 146px;
}

.label-image {
  display: flex;

  .van-image {
    width: 232px;
    height: 146px;
  }

  .van-image:nth-child(2) {
    margin: 0 4px;
  }
}
</style>
