<template>
  <main>
    <nav-bar :user_data="user_data"></nav-bar>
    <div class="wrap">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import NavBar from "../components/navTopBar.vue";

export default {
  data() {
    return {
      user_data: {}
    };
  },
  components: {
    NavBar
  },
  created() {
    this.$http.get("/user/1").then(res => {
      this.user_data = res.data;
    });
  }
};
</script>

<style scoped>
.wrap {
  max-width: 80vw;
  margin: 3rem auto 2rem;
}
@media (max-width: 650px) {
  .wrap {
    max-width: 100%;
  }
}
</style>
