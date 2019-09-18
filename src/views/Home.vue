<template>
  <main>
    <nav-bar></nav-bar>
    <Breadcrumb />
    <div class="wrap">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </main>
</template>

<script>
import NavBar from "../components/navTopBar.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import userApi from "@/api/user";
export default {
  data() {
    return {};
  },
  components: {
    NavBar,
    Breadcrumb
  },
  created() {
    userApi
      .getUserData({
        id: localStorage.uid
      })
      .then(res => {
        this.$store.commit("setUser", res.data.username);
        this.$store.commit("setEmail", res.data.email);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
