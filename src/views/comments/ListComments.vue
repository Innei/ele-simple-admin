<template>
  <el-container>
    <el-header>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="1">
          <span slot="label" style="position: relative;">
            已通过
            <el-badge :value="info.passed" class="badge-a" type="primary" />
          </span>
        </el-tab-pane>

        <el-tab-pane name="0">
          <span slot="label" style="position: relative;">
            待审核
            <el-badge :value="info.needChecked" class="badge-a" />
          </span>
        </el-tab-pane>
        <el-tab-pane name="2" label="垃圾"></el-tab-pane>
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
                    <a :href="'mailto:' + scope.row.email">
                      <span>{{ scope.row.email }}</span>
                    </a>
                  </el-form-item>
                  <el-form-item label="IP 地址">
                    <span>{{ scope.row.ipAddress }}</span>
                  </el-form-item>
                  <el-form-item label="网址">
                    <a :href="scope.row.url">
                      <span>{{ scope.row.url }}</span>
                    </a>
                  </el-form-item>
                  <el-form-item label="详细日期">
                    <span>{{convertDate(scope.row.createTime)}}</span>
                  </el-form-item>
                  <el-form-item label="位于文章">
                    <router-link
                      :to="{name: 'edit', 
                      props: {id: scope.row.post._id},
                      query: {id: scope.row.post._id}}"
                    >{{scope.row.post.title}}</router-link>
                  </el-form-item>
                  <el-form-item v-if="scope.row.parent" label="上一条评论">{{scope.row.parent.content}}</el-form-item>
                  <el-form-item :label="scope.row.parent ? '这条回复' : '内容'">
                    <p v-html="md.render(scope.row.content)"></p>
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
                  v-if="!scope.row.parent"
                  :to="{name: 'edit', props: {id: scope.row.post._id},query: {id: scope.row.post._id}}"
                >{{scope.row.post.title}}</router-link>
                <span v-if="scope.row.parent">
                  这是一条评论回复
                  <br />请展开查看详情
                </span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  v-if="activeName === '1'"
                  type="text"
                  size="small"
                  @click="handleReply(scope.$index, scope.row)"
                >回复</el-button>
                <el-button
                  v-if="activeName === '0'"
                  type="text"
                  size="small"
                  @click="handlePass(scope.$index, scope.row)"
                >通过</el-button>

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
import markdown from "markdown-it";
const md = new markdown();
moment.locale("zh-cn");
export default {
  data() {
    return {
      comments: [],
      info: {},
      options: {},
      loading: true,
      showBar: false,
      selectedItems: [],
      Interval: null,
      activeName: "0",
      md
    };
  },
  methods: {
    getCommentsList(page, state, keyword) {
      this.loading = true;
      commentApi
        .getList({
          page,
          keyword,
          state
        })
        .then(res => {
          //console.log(res.data);
          const data = res.data.data.map(item => {
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
          this.options = res.data.options;
          this.loading = false;
        });
      this.getCommentsNums();
    },
    onSearch() {},
    reset() {},
    handleReply(index, row) {
      this.$prompt("请输入回复内容", "提示", {
        confirmButtonText: "提交",
        cancelButtonText: "取消"
      }).then(({ value }) => {
        commentApi
          .reply({
            pid: row.pid,
            cid: row.cid,
            content: value,
            email: this.$store.state.user_data.email,
            author: this.$store.state.user_data.username
          })
          .then(res => {
            if (res.data.ok === 1) {
              this.$message.success("回复成功");
              this.getCommentsList(1, 1);
            }
          });
      });
    },
    handlePass(index, row) {
      commentApi.modState(row._id, 1).then(res => {
        if (res.data.nModified === 1) {
          this.$message.success("已通过");
          this.getCommentsList(1, 0);
        } else {
          this.$message.error("出错了~");
        }
      });
    },
    handleClick(tab, event) {
      // console.log(tab.name);
      // console.log(tab, event);
      this.getCommentsList(1, tab.name);
    },
    async handleDelete(index, row) {},
    handleChangePage(page) {
      // 平滑滚动
      document.querySelector("body > main > ul").scrollIntoView({
        behavior: "smooth"
      });
      this.getCommentsList(page, Number(this.activeName));
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
    },
    getCommentsNums() {
      commentApi.getNum().then(res => {
        this.info = res.data;
      });
    }
  },
  created() {
    this.getCommentsList(1, 0);
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
.badge-a {
  position: absolute;
}
</style>
<style>
.el-tabs__nav-wrap.is-top::after {
  width: 13rem;
  /* width: 0; */
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