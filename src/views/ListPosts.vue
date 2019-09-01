<template>
  <el-container>
    <el-main>
      <el-card class="bax-card" shadow="never">
        <el-form :model="search" class="search-wrap">
          <el-form-item label="关键字: " class="item">
            <el-input v-model="search.keyword"></el-input>
          </el-form-item>

          <el-form-item label="文章状态: " class="item">
            <el-select v-model="search.state" placeholder>
              <el-option label="未审核" value="0"></el-option>
              <el-option label="已发布" value="1"></el-option>
              <el-option label="已过期" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      posts: {},
      search: {
        keyword: "",
        state: ""
      }
    };
  },
  methods: {
    onSearch() {},
    reset() {
      this.search = { keyword: "", state: "" };
    }
  }
};
</script>

<style scoped>
.search-wrap {
  display: flex;
  justify-content: space-between;
}
.search-wrap .item {
  display: flex;
}
</style>