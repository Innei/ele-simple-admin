<template>
  <main>
    <nav-bar :user_data="user_data"></nav-bar>
    <Breadcrumb />
    <div class="wrap">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </main>
</template>

<script>
import NavBar from '../components/navTopBar.vue'
import Breadcrumb from '../components/Breadcrumb.vue'
export default {
  data() {
    return {
      user_data: {}
    }
  },
  components: {
    NavBar,
    Breadcrumb
  },
  created() {
    this.$http.get('/user/1').then(res => {
      this.user_data = res.data
    })
  }
}
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
