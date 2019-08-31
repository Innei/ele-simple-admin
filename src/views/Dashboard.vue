<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <h2>你好，{{userData.username}}</h2>

        <div class="container">
          <header>个人信息</header>

          <main>
            <div>账号创建时间： {{userData.create_time.year}}年{{userData.create_time.month}}月{{userData.create_time.day}}日</div>
          </main>
        </div>

        <div class="container">
          <header>最近发布的文章</header>

          <main>
            <li v-for="item in userData.recentlyPosts" :key="item._id">
              {{convertDate(item.createTime).month}}/{{convertDate(item.createTime).day}}
              <a :href="'http://localhost:3000/posts/' + item._id" target="_blank">{{item.title}}</a>
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
      userData: {}
    };
  },
  created() {
    this.$http.get("/user/get_info/1").then(res => {
      this.userData = res.data;

      this.userData.create_time = this.convertDate(res.data.create_time);
    });
  },
  methods: {
    convertDate(date) {
      var date = new Date(Number(date));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return { year, month, day };
    }
  }
};
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