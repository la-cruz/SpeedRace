<template>
	<section class="page game">
		<!-- <game-header message="MifMapApp"></game-header> -->
		<!-- <game-stats-card></game-stats-card> -->
        <game-settings ></game-settings>
		<div class="game-view">
			<!-- <game-form title="Position"></game-form> -->
			<game-map title="Carte"></game-map>
		</div>
  	</section>
</template>

<script>
    // import GameHeader from './GameHeader.vue'
    // import GameForm from './GameForm.vue'
    import GameMap from './GameMap.vue'
    // import GameStatsCard from './GameStatsCard.vue'
    import GameSettings from './GameSettings.vue'

    export default {
        name: 'Game',
        components: { GameSettings, GameMap }
    }
</script>

<style lang="scss">
    .game {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

        .game-view {
          width: 100%;
          display: flex;
        }
    }
</style>