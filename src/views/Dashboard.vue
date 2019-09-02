<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <h2>你好，{{ userData.username }}</h2>

        <div class="container">
          <header>个人信息</header>

          <main>
            <div>
              账号创建时间： {{ createDate.year }}年{{ createDate.month }}月{{
                createDate.day
              }}日
            </div>
            <div>距离现在已有 {{ commemorationDay }} 天</div>
            <div>目前有 {{ userData.options.publish_nums }} 篇文章</div>
          </main>
        </div>

        <div class="container">
          <header>最近发布的文章</header>

          <main>
            <li v-for="item in userData.recentlyPosts" :key="item._id">
              {{ convertDate(item.createTime).month }}/{{
                convertDate(item.createTime).day
              }}
              <el-link
                :href="'http://localhost:3000/posts/' + item._id"
                target="_blank"
                >{{ item.title }}</el-link
              >
            </li>
          </main>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        options: {}
      }
    }
  },
  created() {
    this.$http.get('/user/get_info/1').then(res => {
      this.userData = res.data

      // = this.convertDate(res.data.create_time)
    })
  },
  methods: {
    convertDate(date) {
      var date = new Date(Number(date))
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      return { year, month, day }
    }
  },
  computed: {
    createDate() {
      const date = new Date(Number(this.userData.create_time))

      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      return { year, month, day }
    },
    commemorationDay() {
      return Math.floor((Date.now() - this.userData.create_time) / (1000 * 60 * 60 * 24))
    }
  }
}
</script>

<style>
h2 {
  font-weight: 100;
}
.container > header {
  color: #909399;
  font-weight: 100;
}
.container main {
  margin-top: 1.5rem;
}
.container {
  margin-top: 1.5rem;
}
</style>
