<template>
  <div>
    <navmenu></navmenu>
    <router-view></router-view>
  </div>
</template>

<script>
  import navmenu from "./components/navmenu.vue"

  export default {
      name: 'app',
      components: { navmenu }
  }
</script>

<style>
</style>