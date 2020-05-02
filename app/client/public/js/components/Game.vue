<template>
	<section class="page game">
        <game-settings ></game-settings>
		<div class="game-view">
			<game-map title="Carte"></game-map>
		</div>
  	</section>
</template>

<script>
    import GameMap from './GameMap.vue'
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