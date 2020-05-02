<template>
  <section class="page game">
    <game-header message="MifMapApp"></game-header>
    <div class="game-view">
      <game-form title="Position"></game-form>
      <game-map title="Carte"></game-map>
      <game-stats-card></game-stats-card>
    </div>
  </section>
</template>

<script>
    import GameHeader from './GameHeader.vue'
    import GameForm from './GameForm.vue'
    import GameMap from './GameMap.vue'
    import GameStatsCard from './GameStatsCard.vue'

    export default {
        name: 'Game',
        components: { GameHeader, GameForm, GameMap, GameStatsCard }
    }
</script>

<style lang="scss">
  .game {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .game-view {
      display: flex;
    }
  }
</style>