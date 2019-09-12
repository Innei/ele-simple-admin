<template>
  <el-container>
    <el-header>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已通过" name="pass"></el-tab-pane>
        <el-tab-pane label="待审核" name="needCheck"></el-tab-pane>
        <el-tab-pane label="垃圾" name="gomi"></el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main>
      <el-card class="bax-card" shadow="never">
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
            :data="comments"
            style="overflow: auto"
            v-loading="loading"
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="作者">
                    <span>{{ scope.row.author }}</span>
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <el-link :href="'mailto:' + scope.row.email">
                      <span>{{ scope.row.email }}</span>
                    </el-link>
                  </el-form-item>
                  <el-form-item label="IP 地址">
                    <span>{{ scope.row.ipAddress }}</span>
                  </el-form-item>
                  <el-form-item label="网址">
                    <el-link :href="scope.row.url">
                      <span>{{ scope.row.url }}</span>
                    </el-link>
                  </el-form-item>
                  <el-form-item label="详细日期">
                    <span>{{convertDate(scope.row.createTime)}}</span>
                  </el-form-item>
                  <el-form-item label="位于文章">
                    <router-link
                      :to="{name: 'edit', props: {id: scope.row.post._id},query: {id: scope.row.post._id}}"
                    >{{scope.row.post.title}}</router-link>
                  </el-form-item>
                  <el-form-item label="内容">
                    <span>{{ scope.row.content }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="author" width="100" label="昵称"></el-table-column>

            <el-table-column prop="cTime" width="100" label="日期"></el-table-column>
            <el-table-column label="内容" width="400">
              <template slot-scope="scope">
                <span>{{scope.row.content.slice(0,30)}}{{scope.row.content.length > 30 ? ' ...': ''}}</span>
              </template>
            </el-table-column>
            <el-table-column label="位于">
              <template slot-scope="scope">
                <router-link
                  :to="{name: 'edit', props: {id: scope.row.post._id},query: {id: scope.row.post._id}}"
                >{{scope.row.post.title}}</router-link>
                <!-- <el-link :href="scope.row.post._id">{{scope.row.post.title}}</el-link> -->
              </template>
            </el-table-column>
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
import commentApi from "@/api/comments";
import { setInterval, clearInterval } from "timers";
moment.locale("zh-cn");
export default {
  data() {
    return {
      comments: [],
      options: {},
      loading: true,
      showBar: false,
      selectedItems: [],
      Interval: null,
      activeName: "pass"
    };
  },
  methods: {
    getCommentsList(page, keyword, state) {
      this.loading = true;
      commentApi
        .getList({
          page,
          keyword,
          state
        })
        .then(res => {
          console.log(res.data);
          const data = res.data.map(item => {
            // switch (item.state) {
            //   case 0:
            //     item.state = "待审核";
            //     break;
            //   case 1:
            //     item.state = "已发布";
            //     break;
            //   case 2:
            //     item.state = "垃圾";
            //     break;
            //   default:
            //     break;
            // }

            item.cTime = moment(new Date(Number(item.createTime))).fromNow();
            return item;
          });
          this.comments = data;
          this.loading = false;
        });
    },
    onSearch() {},
    reset() {},
    handleEdit(index, row) {},
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async handleDelete(index, row) {},
    handleChangePage(page) {
      // 平滑滚动
      document.querySelector("body > main > ul").scrollIntoView({
        behavior: "smooth"
      });
      // this.getCommentsList(page, this.search.keyword);
    },
    handleSelectionChange(val) {},
    handleDelMore() {},
    setTimeUpdate() {
      this.Interval = setInterval(() => {
        this.comments.map(item => {
          item.cTime = moment(new Date(Number(item.createTime))).fromNow();
          return item;
        });
      }, 10000);
    },
    clearInterval() {
      clearInterval(this.Interval);
      console.log("clear interval.");
    },
    convertDate(timestamp) {
      return moment(new Date(timestamp)).format("YYYY MMMM Do, h:mm:ss a");
    }
  },
  created() {
    this.getCommentsList(1);
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
<style>
.el-tabs__nav-wrap.is-top::after {
  width: 13rem;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>