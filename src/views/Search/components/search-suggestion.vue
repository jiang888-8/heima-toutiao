<template>
  <div>
    <van-cell @click="onClickItem(item)" v-for="(item,index) in suggestions" :key="index" icon="search" >
      <template #title>
        <div v-html="formatStr(item)"></div>
      </template>
    </van-cell>

    <!-- 搜索提示 -->
    <van-empty v-if="!suggestions.length" image="search" description="暂无建议" />
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      suggestions: []
    }
  },

  props: {
    searchText: {
      type: String,
      requried: true
    }
  },

  watch: {
    searchText: {
      immediate: true, // 首次监听
      handler (newval) {
        this.setId && clearTimeout(this.setId)
        this.setId = setTimeout(() => {
          this.loadSearchSuggestion()
        }, 800)
      }
    }
  },

  created () {

  },

  beforeDestroy () {
    clearTimeout(this.setId)
  },

  methods: {
    async loadSearchSuggestion () {
      try {
        const { options: res } = await getSearchSuggestion(this.searchText)
        this.suggestions = res
      } catch (errs) {
        Toast('获取联想建议失败')
      }
    },

    formatStr (str) {
      const reg = new RegExp(this.searchText, 'gi')
      return str.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    },

    onClickItem (item) {
      this.$emit('clickItem', item)
    }
  }
}
</script>

<style scoped>

</style>
