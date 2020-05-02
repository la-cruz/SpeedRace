<template>
    <section class="container-creation">
        <h1>{{ title }}</h1>
        <hr>
        <form class="create-game" @submit.prevent>
            <div v-if="!gameStarted" class="reverse-input">
                <input class="input-text" type="text" v-model="name" />
                <label for="name"> Entrez le nom de la partie :</label>
            </div>
            <input class="btn" type="submit" :value="textBtn" @click="createGame" v-if="!gameJoined"/>
            <a href="/#/game" class="btn" v-else>Allez à la map</a>
        </form>
    </section>
</template>

<script>
    import GameHandler from '../libraries/GameHandler'
    import DataModule from '../libraries/DataModule'
    import store from '../stores/store'
    import Vuex from 'vuex'

    export default {
        name: 'GameCreate',
        store,
        data () {
            return {
                name: "",
            }
        },
        computed: {
            ...Vuex.mapGetters([
                'login',
                'gameStarted',
                'gameJoined',
                'latitude',
                'longitude'
            ]),
            textBtn () {
                return this.gameStarted ? "Rejoindre la partie" : "Commencer la partie"
            },
            title () {
                return this.gameStarted ? "Rejoindre la partie" : "Créer la partie"
            }
        },
        methods: {
            ...Vuex.mapActions([
                'changeGame',
                'changeStats',
                'updateMarker',
                'join',
                'getStats'
            ]),
            createGame () {
                if(!this.gameStarted) {
                    GameHandler.start(this.name).then(() => {
                        this.changeGame(true)
                        this.join()
                        DataModule.stats(this.login).then((response) => {
                            DataModule.changePosition(response.id, this.latitude, this.longitude)
                        })
                        console.log("je vais prendre les stats")
                        this.getStats()
                        GameHandler.createTarget(this.latitude, this.longitude, true)
                    })
                } else {
                    if(!this.gameJoined) {
                        this.getStats()
                        this.join()
                        DataModule.stats(this.login).then((response) => {
                            DataModule.changePosition(response.id, this.latitude, this.longitude)
                        })
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .container-creation {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1 {
            font-size: 3rem;
            font-weight: bold;
            text-transform: uppercase;
            color: white;
            padding-bottom: 1rem;
        }

        .create-game {
            width: 100%;
            height: 10rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;

            .reverse-input {
                width: 40%;
                display: flex;
                flex-direction: column-reverse;
            }
    
            label {
                color: white;
                margin: 1rem 0;
                font-size: 1.1rem;
                text-transform: uppercase;
                font-weight: bold;
            }

            input {
                color: black;
                width: 100%;
                font-size: 1.5rem;
            }
    
            a {
                &.btn {
                    font-size: 1.8rem;
                    font-weight: bold;
                    padding: 1rem 3rem;
                    width: max-content;
                    margin-top: 0;
                }
            }

            .btn {
                width: 40%;
            }
        }

        hr {
            width: 30%;
            height: 4px;
            border: none;
            margin-bottom: 3rem;
            background-color: #FFCD00;
        }
    }
</style>