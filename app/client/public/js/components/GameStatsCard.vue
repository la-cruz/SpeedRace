<template>
  <aside class="stats-card">
        <div class="container-login">
            <font-awesome-icon icon="user-circle" />
            <h2>{{ login }}</h2>
            <hr>
        </div>
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
        
        .container-login {

            h2 {
                font-size: 1.4rem;
                font-weight: bold;
                margin-top: 1rem;
            }

            @media (max-width: 768px) { 
                display: none;
            }
        }


        .container-timer {
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
                margin-right: 1rem;

                @media (max-width: 768px) { 
                    font-size: 1.3rem;
                }
            }

            .ttl {
                font-size: 3rem;
                vertical-align: middle;

                @media (max-width: 768px) { 
                    font-size: 1.3rem;
                }
            }

            @media (max-width: 768px) { 
                margin: 0rem 1rem;
                width: max-content;
                padding: 0.8rem 2rem;
                border-radius: 50px;
                background-color: white;
                box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
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
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);

            &.alive {
                background-color: rgb(24, 136, 24);
            }

            &.dead {
                background-color: rgb(141, 27, 27);
            }

            @media (max-width: 768px) { 
                margin: 0rem 1rem;
            }
        }

        @media (max-width: 768px) { 
            flex-direction: row;
            justify-content: space-between;
        }
    }
</style>