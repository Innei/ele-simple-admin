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
              <!-- <el-option label="未审核" value="0"></el-option> -->
              <el-option label="已发布" value="1"></el-option>
              <el-option label="已过期" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <el-main class="btn-wrap">
          <el-button type="primary" @click="newPost">
            <i class="el-icon-plus" style="font-weight: 800"></i> 写文章
          </el-button>
        </el-main>
        <el-main class="table">
          <el-table :data="posts" style="overflow: auto">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="title" label="标题" width="180"></el-table-column>
            <el-table-column prop="state" label="状态" width="180"></el-table-column>
            <el-table-column label="评论量" width="100"></el-table-column>
            <el-table-column prop="views" label="访问量" width="100"></el-table-column>
            <el-table-column prop="modifyTime" label="更新时间"></el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
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
moment.locale("zh-cn");
export default {
  data() {
    return {
      posts: [],
      search: {
        keyword: "",
        state: ""
      },
      options: {}
    };
  },
  methods: {
    getPostsList(page, keyword, state) {
      this.$http
        .get("/posts", {
          params: {
            page,
            keyword,
            state
          }
        })
        .then(res => {
          res.data.data.map(item => {
            item.state =
              (item.outdateTime < Date.now() && item.isOutdate) ||
              item.limitTime === 0
                ? "已过期"
                : "已发布";
            item.modifyTime = moment(
              new Date(Number(item.modifyTime))
            ).fromNow();
            return item;
          });
          this.posts = res.data.data;
          this.options = res.data.options;
        });
    },
    onSearch() {
      const keyword = this.search.keyword;
      const state = this.search.state;

      this.getPostsList(1, keyword, state);
    },
    reset() {
      this.search = { keyword: "", state: "" };
      this.getPostsList(1)
    },
    newPost() {},
    handleEdit(index, row) {},
    handleDelete(index, row) {},
    handleChangePage(page) {
      // 平滑滚动
      document.querySelector("body > main > ul").scrollIntoView({
        behavior: "smooth"
      });
      this.getPostsList(page, this.search.keyword);
    }
  },
  created() {
    this.getPostsList(1);
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
</style>