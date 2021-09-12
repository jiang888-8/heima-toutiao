<template>
  <div class="search-container">
    <!--  action 不为空，即可在 iOS 输入法中显示搜索按钮 -->

    <van-sticky>
      <form action="/">
        <van-search
          v-model.trim="searchText"
          show-action
          placeholder="请输入搜索关键词"
          background="#3296fa"
          @search="onSearch"
          @cancel="$router.back()"
          @focus='isShowResluts = false'
        />
      </form>
    </van-sticky>

    <!-- 搜索结果 -->
    <SearchResults :searchText='searchText' v-if="isShowResluts"/>
    <!-- 搜索历史 -->
    <SearchHistory @search='onSearch' :history='history' v-else-if="!searchText"/>
    <!-- 搜索建议 -->
    <SearchSuggestion @clickItem='onSearch' :searchText='searchText' v-else/>

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResults from './components/search-results.vue'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  data () {
    return {
      searchText: '',
      isShowResluts: false,
      history: getItem('HMTT-HISTORY') || [] // 搜索历史
    }
  },

  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResults
  },

  watch: {
    history: {
      deep: true,
      handler () {
        setItem('HMTT-HISTORY', this.history)
      }
    }
  },

  created () {

  },

  methods: {
    onSearch (val) {
      if (val !== '') {
        // 记录搜索历史
        this.history.unshift(val)
        // es6 方法去重
        this.history = [...new Set(this.history)]
        this.searchText = val
        this.isShowResluts = true
      }
    }
  }
}
</script>

<style scoped lang='less'>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
