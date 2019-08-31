<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    router
    @select="handleSelect"
  >
    <el-menu-item index="/dashboard">{{user_data.username}}</el-menu-item>

    <el-menu-item index="3" style="float: right">消息中心</el-menu-item>
  </el-menu>
</template>

<script>

export default {
  data() {
    return {
      
      activeIndex: "/dashboard",
    };
  },
  props:{
    user_data: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
@media (max-width: 600px) {
  ul {
    padding: 0;
  }
}
</style>