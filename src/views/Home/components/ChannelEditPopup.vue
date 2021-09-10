<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <div class="my-channel channel">
      <van-cell :border='false' title="我的频道" >
        <template>
          <van-button @click="isEdit = !isEdit" color="darkred" size="mini" plain round >
            {{ isEdit ? '完成' : '编辑' }}
          </van-button>
        </template>
      </van-cell>
      <van-grid :gutter="10" >
        <van-grid-item
        @click='onClickMyItem(index,item.id)'
        :class="{ active: index === activeIndex }"
        v-for="(item,index) in myChannels"
        :key="item.id"
        :text="item.name"
        :icon="(isEdit && index !== 0) ? 'close' : ''" />
      </van-grid>
    </div>

    <!-- 推荐频道 -->
    <div class="recommend-channel channel">
      <van-cell :border='false' title="推荐频道" ></van-cell>
      <van-grid :gutter="10" direction='horizontal' icon-size='0.32rem'>
        <van-grid-item @click="addToMyChannels(item)" v-for="item in recommendChannels" :key="item.id" :text="item.name" icon="plus" />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channels.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },

  props: {
    myChannels: {
      type: Array,
      requried: true
    },
    activeIndex: {
      type: Number,
      requried: true
    }
  },

  created () {
    this.loadAllChannels()
  },

  computed: {
    // 推送频道数据
    recommendChannels () {
      return this.allChannels.filter(channelItem => {
        return !this.myChannels.some(myItem => myItem.id === channelItem.id)
      })
    },

    ...mapState(['user'])
  },

  methods: {
    async loadAllChannels () {
      try {
        const { channels } = await getAllChannels()
        this.allChannels = channels
      } catch (error) {
        Toast('获取全部列表失败')
      }
    },

    // 点击推荐频道
    async addToMyChannels (item) {
      this.myChannels.push(item)
      if (this.user) {
        // 已登录，上传
        try {
          await addUserChannel({
            id: item.id,
            seq: this.myChannels.length
          })
          Toast('添加成功')
        } catch (err) {
          Toast('添加失败')
        }
      } else {
        // 没登录，存本地
        setItem('HMTT-CHANNELS', this.myChannels)
      }
    },

    // 点击我的频道
    onClickMyItem (index, id) {
      if (this.isEdit) {
        if (index === 0) return
        if (index <= this.activeIndex) {
          this.$emit('update-active', this.activeIndex - 1, true)
        }
        this.myChannels.splice(index, 1)
        // 进行持久化
        this.deleteStorage(id)
      } else {
        console.log('跳转')
        this.$emit('update-active', index, false)
      }
    },

    // 删除持久化
    async deleteStorage (id) {
      if (this.user) {
        console.log('qq')
        try {
          await deleteUserChannel(id)
          Toast('删除成功')
        } catch (error) {
          Toast('删除失败')
        }
      } else {
        setItem('HMTT-CHANNELS', this.myChannels)
      }
    }
  }
}
</script>

<style scoped lang='less'>
.channel-edit {
  padding-top: 90px;

  /deep/.van-grid-item__icon+.van-grid-item__text {
    margin-top: 0;
  }

  .my-channel {
    .van-cell {
      display: flex;
      align-items: center;

      .van-button {
        width: 103px;
        height: 50px;
      }
    }

    /deep/.active {
      .van-grid-item__text {
        color: red!important;
      }
    }

    /deep/.van-icon-close {
       position: absolute;
       top: -10px;
       right: -10px;
       font-size: 32px;
    }
  }

  .channel {
      /deep/.van-grid {
        .van-grid-item__content {
          width: 160px;
          height: 86px;
          background: #f4f5f6;
          border-radius: 6px;

          .van-grid-item__text {
            font-size: 28px;
            color: #222;
          }
        }

        .van-grid-item__content::after {
          border: none;
        }
      }
    }
}
</style>
