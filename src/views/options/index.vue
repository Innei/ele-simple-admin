<template>
  <el-container style="min-height: calc(100vh - 13rem);">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1']" unique-opened :default-active="$route.path" router>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-user-solid"></i>用户设置</template>
          <el-menu-item-group>
            <el-menu-item index="/options/profile">个人设置</el-menu-item>
            <el-menu-item index="/options/security">安全设置</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  export default {}
</script>

<style scoped>
  .main {
    margin: 0;
    padding: 0 2rem 0;
  }
</style>
<style>

  .el-aside {
    color: #333;
  }
</style>