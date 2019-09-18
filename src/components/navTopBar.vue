<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    router
    @select="handleSelect"
  >
    <el-menu-item index="/dashboard">概要</el-menu-item>

    <el-submenu index="/posts" class="sub">
      <template slot="title">文章</template>
      <el-menu-item index="/posts/edit">撰写</el-menu-item>
      <el-menu-item index="/posts/list">所有文章</el-menu-item>
    </el-submenu>

    <el-menu-item index="/comments">评论</el-menu-item>

    <el-submenu index="3" style="float: right">
      <template slot="title">{{ user_data.username }}</template>
      <el-menu-item @click="logout">登出</el-menu-item>
      <el-menu-item>设置</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      localStorage.clear();
      this.$router.push("/login");
      this.$message.success("登出成功");
    }
  },
  computed: {
    user_data() {
      return this.$store.state.user_data;
    },
    activeIndex() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

ul {
  padding: 0 4rem;
}
ul li {
  height: 3rem !important;
  line-height: 3rem !important;
}
@media (max-width: 600px) {
  ul {
    padding: 0;
  }
}
</style>

<style>
.el-submenu__title {
  height: 3rem !important;
  line-height: 3rem !important;
}
</style>
