<template>
  <aside class="stats-card">
        <font-awesome-icon icon="user-circle" />
        <h2>{{ login }}</h2>
        <hr>
        <div class="container-timer">
            <font-awesome-icon icon="stopwatch" />
            <span class="ttl">{{ ttl }}</span>
        </div>
        <p class="status alive" v-if="status == 'alive'">{{ status }}</p>
        <p class="status dead" v-else>{{ status }}</p>
  </aside>
</template>

<script>
    import store from '../stores/store'
    import Vuex from 'vuex'
    import DataModule from '../libraries/DataModule'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faUserCircle, faStopwatch } from '@fortawesome/free-solid-svg-icons'
    library.add(faUserCircle, faStopwatch)

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
        color: rgb(56, 56, 56);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        svg {
            color: #FFCD00;
            font-size: 2.5rem;
        }

        h2 {
            font-size: 1.4rem;
            font-weight: bold;
            margin-top: 1rem;
        }

        .container-timer {
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
                margin-right: 1rem;
            }

            .ttl {
                font-size: 3rem;
                vertical-align: middle;
            }
        }

        hr {
            width: 80%;
            height: 4px;
            border: none;
            margin: 1rem 0 1rem 0;
            background-color: #FFCD00;
        }
        
        .status {
            color: white;
            width: max-content;
            padding: 0.8rem 2rem;
            font-size: 1.3rem;
            border-radius: 50px;
            text-transform: uppercase;
            margin-top: 1rem;

            &.alive {
                background-color: rgba(24, 136, 24, 0.8);
            }

            &.dead {
                background-color: rgba(163, 26, 26, 0.8);
            }
        }
    }
</style>