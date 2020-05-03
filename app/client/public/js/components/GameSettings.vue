<template>
    <div class="container-settingsGame">
        <!-- <game-header message="MifMapApp"></game-header> -->
        <game-stats-card></game-stats-card>
        <hr>
        <game-form title="Position"></game-form>
    </div>
</template>

<script>
    import GameHeader from './GameHeader.vue'
    import GameForm from './GameForm.vue'
    import GameStatsCard from './GameStatsCard.vue'

    export default {
        name: 'GameSettings',
        components: { GameHeader, GameForm, GameStatsCard },
    }
</script>

<style lang="scss">
    .container-settingsGame {
        position: absolute;
        top: 7rem;
        right: 2rem;
        bottom: 2rem;
        height: fit-content;
        width: 20%;
        background-color: white;
        border-radius: 10px;
        z-index: 100000;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 2rem 0;

        hr {
            width: 80%;
            height: 4px;
            border: none;
            margin: 2rem 0 1rem 0;
            background-color: #FFCD00;
        }
    }
</style>