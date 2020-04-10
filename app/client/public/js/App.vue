<template>
  <v-app>
    <nav-menu></nav-menu>
    <router-view v-if="connected"></router-view>
    <home-page v-else></home-page>
  </v-app>
</template>

<script>
  import NavMenu from "./components/NavMenu.vue"
  import HomePage from "./components/HomePage.vue"
  import { VApp } from "vuetify/lib"
  import store from "./stores/store"
  import Vuex from "vuex"

  export default {
      name: 'App',
      store: store,
      components: { NavMenu, HomePage, VApp },
      computed: {
        ...Vuex.mapGetters([
          'connected'
        ])
      }
  }
</script>

<style lang="scss">

</style>