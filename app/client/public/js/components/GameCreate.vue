<template>
    <section>
        <h1>{{ title }}</h1>
        <form class="create-game" @submit.prevent>
            <div v-if="!gameStarted">
                <label for="name"> Nom de la partie :</label><input type="text" v-model="name" />
            </div>
            <input type="submit" :value="textBtn" @click="createGame" />
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
        props: {
            title: {
                type: String, 
                default: "Creer une partie",
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
            }
        },
        methods: {
            ...Vuex.mapActions([
                'changeGame',
                'join'
            ]),
            createGame () {
                if(!this.gameStarted) {
                    GameHandler.start(this.name).then(() => {
                        this.changeGame(true)
                        this.join()
                        DataModule.stats(this.login).then((response) => {
                            DataModule.changePosition(response.id, this.latitude, this.longitude)
                        })
                    })
                } else {
                    this.join()
                    DataModule.stats(this.login).then((response) => {
                        DataModule.changePosition(response.id, this.latitude, this.longitude)
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
    .create-game {
        width: 100%;
        height: 10rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;

        label {
            margin-right: 2rem;
        }

        input {
            color: black;

            &[type=text] {
                width: 50%;
                height: 1.5rem;
            }

            &[type=submit] {
                width: 30%;
                height: 2rem;
            }
        }

        
    }
</style>