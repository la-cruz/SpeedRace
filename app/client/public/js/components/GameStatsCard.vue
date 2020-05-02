<template>
  <aside class="stats-card">
      <h2>{{ login }}</h2>
      <p class="status">{{ status }}</p>
      <span class="ttl">{{ ttl }}</span>
  </aside>
</template>

<script>
    import store from '../stores/store'
    import Vuex from 'vuex'
    import DataModule from '../libraries/DataModule'

    export default {
        name: 'GameStatsCard',
        store,
        computed: {
            ...Vuex.mapGetters([
                'login',
                'ttl',
                'status'
            ])
        }
    }
</script>

<style lang="scss">
    .stats-card {
        color: rgb(235, 231, 27);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        width: 20%;
        border: rgb(235, 231, 27) solid 2px;
        border-radius: 10px;
        align-self: center;

        .status {
            font-size: 2rem;
        }

        .ttl {
            font-size: 5rem;
        }
    }
</style>