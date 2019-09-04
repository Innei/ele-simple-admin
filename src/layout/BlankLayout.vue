<template>
  <transition name="el-fade-in" mode="out-in">
    <router-view></router-view>
  </transition>
</template>
<script>
export default {
  name: "BlankLayout"
};
</script>

<style scoped>
</style>
