<template>
  <div>
    <nav-menu></nav-menu>
    <router-view v-if="connected"></router-view>
    <home-page v-else></home-page>
  </div>
</template>

<script>
  import NavMenu from "./components/NavMenu.vue"
  import HomePage from "./components/HomePage.vue"
  import store from "./stores/store"
  import Vuex from "vuex"

  export default {
      name: 'App',
      store: store,
      components: { NavMenu, HomePage },
      computed: {
        ...Vuex.mapGetters([
          'connected',
          'winner',
          'login',
          'status'
        ])
      }
  }
</script>

<style lang="scss">

</style>