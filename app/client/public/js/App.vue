<template>
  <div>
    <nav-menu></nav-menu>
    <router-view v-if="connected"></router-view>
    <home-page v-else></home-page>
    <div v-if="winner === login">Bravo, vous avez gagné</div>
    <div v-if="status === 'dead'">T'es mort lol</div>
    <div v-if="winner !== 'none' && winner !== login">Perdu, { winner } à gagné </div>
  </div>
</template>

<script>
  import NavMenu from "./components/NavMenu.vue"
  import HomePage from "./components/HomePage.vue"
  import { VApp, VDialog } from "vuetify/lib"
  import store from "./stores/store"
  import Vuex from "vuex"

  export default {
      name: 'App',
      store: store,
      components: { NavMenu, HomePage, VApp, VDialog },
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