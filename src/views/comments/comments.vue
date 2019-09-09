<template>
  <el-container>
    <el-main>
      <el-card class="bax-card" shadow="never">
        <!-- <el-form :model="search" class="search-wrap">
          <el-form-item label="关键字: " class="item">
            <el-input v-model="search.keyword"></el-input>
          </el-form-item>

          <el-form-item label="状态: " class="item">
            <el-select v-model="search.state" placeholder>
              <el-option label="未审核" value="0"></el-option>
              <el-option label="已发布" value="1"></el-option>
              <el-option label="垃圾" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>-->
        <el-main class="btn-wrap">
          <transition name="el-fade-in">
            <el-button type="danger" @click="handleDelMore" v-if="this.showBar">
              <i class="el-icon-delete" style="font-weight: 800"></i> 删除
            </el-button>
          </transition>
        </el-main>

        <!-- table start -->
        <el-main class="table">
          <el-table
            @selection-change="handleSelectionChange"
            :data="posts"
            style="overflow: auto"
            v-loading="loading"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="author" label="昵称" width="180"></el-table-column>
            <el-table-column prop="state" label="状态" width="180"></el-table-column>
            <el-table-column prop="createTime" label="日期"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  style="color: #F56C6C"
                  @click="handleDelete(scope.$index, scope.row)"
                  type="text"
                  size="small"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- end table -->
          <el-pagination
            :hide-on-single-page="true"
            :page-count="options.totalPage"
            :current-page="options.currentPage"
            @current-change="handleChangePage"
            layout="prev, pager, next"
            class="page-nav"
          ></el-pagination>
        </el-main>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import moment from "moment";
import postApi from "@/api/post";
import { setInterval, clearInterval } from "timers";
moment.locale("zh-cn");
export default {
  data() {
    return {
      posts: [],
      search: {
        keyword: "",
        state: ""
      },
      options: {},
      loading: true,
      showBar: false,
      selectedItems: [],
      Interval: null
    };
  },
  methods: {
    getPostsList(page, keyword, state) {},
    onSearch() {},
    reset() {},
    newPost() {},
    handleEdit(index, row) {},
    async handleDelete(index, row) {},
    handleChangePage(page) {
      // 平滑滚动
      document.querySelector("body > main > ul").scrollIntoView({
        behavior: "smooth"
      });
      // this.getPostsList(page, this.search.keyword);
    },
    handleSelectionChange(val) {},
    handleDelMore() {},
    setTimeUpdate() {},
    clearInterval() {},
    created() {},
    destroyed() {}
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
.btn-wrap {
  margin: 0;
  padding: 0.3rem;
}
.page-nav {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 0.8rem;
}
.bax-card {
  min-height: 80vh;
}
</style>
