<template>
  <div class="search-container">
    <!--  action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
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

    <!-- 搜索结果 -->
    <SearchResults :searchText='searchText' v-if="isShowResluts"/>
    <!-- 搜索历史 -->
    <SearchHistory v-else-if="!searchText"/>
    <!-- 搜索建议 -->
    <SearchSuggestion @clickItem='onSearch' :searchText='searchText' v-else/>

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResults from './components/search-results.vue'
export default {
  data () {
    return {
      searchText: '',
      isShowResluts: false
    }
  },

  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResults
  },

  created () {

  },

  methods: {
    onSearch (val) {
      this.searchText = val
      this.isShowResluts = true
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
