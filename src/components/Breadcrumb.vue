<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in paths.title" :key="item">{{
      item
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    paths() {
      return this.$route.meta
    }
  }
}
</script>

<style scoped>
.bread {
  padding: 1.4rem 4rem;
  background: #f3f3f5a1;
}
@media (max-width: 600px) {
  .bread {
    padding: 1.4rem 1rem;
  }
}
</style>
