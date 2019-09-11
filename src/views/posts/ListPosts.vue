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
            <el-table-column prop="title" label="标题" width="180"></el-table-column>
            <el-table-column prop="state" label="状态" width="180"></el-table-column>
            <el-table-column label="评论量" width="100"></el-table-column>
            <el-table-column prop="views" label="访问量" width="100"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间"></el-table-column>
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
    getPostsList(page, keyword, state) {
      this.loading = true;
      // this.$http
      //   .get("/posts/list", {
      //     params: {
      //       page,
      //       keyword,
      //       state
      //     }
      //   })
      postApi
        .getLists({
          page,
          keyword,
          state
        })
        .then(res => {
          res.data.data.map(item => {
            if (item.state === 0) {
              item.state = "草稿";
            } else {
              item.state =
                (item.outdateTime < Date.now() && item.isOutdate) ||
                item.limitTime === 0
                  ? "已过期"
                  : "已发布";
            }
            item.updateTime = moment(
              new Date(Number(item.modifyTime))
            ).fromNow();

            return item;
          });
          this.posts = res.data.data;
          this.options = res.data.options;
        });
      this.loading = false;
    },
    onSearch() {
      const keyword = this.search.keyword;
      const state = this.search.state;

      this.getPostsList(1, keyword, state);
    },
    reset() {
      this.search = { keyword: "", state: "" };
      this.getPostsList(1);
    },
    newPost() {
      this.$router.push({ name: "edit" });
    },
    handleEdit(index, row) {
      this.$router.push({
        name: "edit",
        query: {
          id: row._id
        },
        params: {
          id: row._id,
          draft: row.state === "草稿" ? 1 : 0,
          pid: row.pid
        }
      });
    },
    async handleDelete(index, row) {
      this.$confirm(
        `此操作将永久删除该${
          row.state !== "草稿" ? "文章" : "草稿"
        }, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          const response = await postApi.del(row._id);
          //nRemoved
          if (response.data.ok === 1) {
            this.$message.success("删除成功");
            this.getPostsList(1);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleChangePage(page) {
      // 平滑滚动
      document.querySelector("body > main > ul").scrollIntoView({
        behavior: "smooth"
      });
      this.getPostsList(page, this.search.keyword);
    },
    handleSelectionChange(val) {
      this.selectedItems = val;
      if (val.length > 1) {
        this.showBar = true;
      } else {
        this.showBar = false;
      }
    },
    handleDelMore() {
      this.$confirm("此操作将永久删除这些文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // const ids = [...this.selectedItems.map(item => item._id)]

          for (const item of this.selectedItems) {
            const response = await postApi.del(item._id);
            if (response.data.ok === 1) {
              this.$message.success(`${item.title} 删除成功`);
            } else {
              this.$message.error(`${item.title} 删除失败`);
            }
          }

          this.getPostsList(1);
        })
        .catch(e => {
          this.$message("已取消");
        });
    },
    setTimeUpdate() {
      this.Interval = setInterval(() => {
        this.posts.map(item => {
          item.updateTime = moment(new Date(Number(item.modifyTime))).fromNow();
          return item;
        });
      }, 10000);
    },
    clearInterval() {
      clearInterval(this.Interval);
      console.log("clear interval.");
    }
  },
  created() {
    this.getPostsList(1);
    this.setTimeUpdate();
  },
  destroyed() {
    this.clearInterval();
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
