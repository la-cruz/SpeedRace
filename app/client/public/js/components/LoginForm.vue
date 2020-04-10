<template>
    <form class="login-form" @submit.prevent>
        <div class="error" v-if="error">
            {{ errorMessage }}
        </div>
        <div v-if="!connected">
            <label>Login : </label><input type="text" v-model="pseudo">
            <label>Mot de passe : </label><input type="password" v-model="password">
        </div>
        <input type="submit" value="Connexion" @click="connection" v-if="!connected">
        <input type="submit" value="Déconnexion" @click="logout" v-else>
    </form>
</template>

<script>
    import LogModule from '../libraries/Connect'
    import DataModule from '../libraries/DataModule'
    import GameModule from '../libraries/GameHandler'
    import store from '../stores/store'
    import Vuex from 'vuex'
    import L from 'leaflet'

    export default {
        name: "LoginForm",
        store: store,
        data () {
            return {
                pseudo: "",
                password: "",
                error: false,
                errorMessage: "",
                loop: null
            }
        },
        computed: {
            ...Vuex.mapGetters([
                'connected',
                'login',
                'latitude',
                'longitude',
                'ttl'
            ])
        },
        methods: {
            ...Vuex.mapActions([
                'changeLogin',
                'changeConnected',
                'changeLat',
                'changeLon',
                'changeGame',
                'changeTargetPosition',
                'changeStats',
                'addMarker',
                'updateMap',
                'updateMarkers',
                'resetStats',
                'getStats',
                'join'
            ]),
            connection () {
                LogModule.login(this.pseudo, this.password).then((response) => {
                    this.error = false
                    if(response !== true) {
                        this.error = true
                        this.errorMessage = response
                    } else {
                        this.changeLogin(this.pseudo)
                        this.changeConnected(response)

                        navigator.geolocation.watchPosition((position) => {
                            this.changeLat(position.coords.latitude)
                            this.changeLon(position.coords.longitude)
                            this.addMarker({
                                markerLat: position.coords.latitude,
                                markerLon: position.coords.longitude,
                                message: this.login
                            })

                            DataModule.changePosition(this.login, position.coords.latitude, position.coords.longitude)
                            this.updateMap()
                        });

                        this.loop = setInterval(() =>{
                            DataModule.list().then((json) => {
                                Object.keys(json.list).forEach((key) => {

                                    let player = json.list[key]

                                    this.addMarker({
                                        markerLat: parseFloat(player.position[0]),
                                        markerLon: parseFloat(player.position[1]),
                                        message: player.id,
                                        circle: player.blurred
                                    })

                                    if(player.id === "target") {
                                        this.changeTargetPosition({
                                            newLat: player.position[0], 
                                            newLon: player.position[1]
                                        })
                                    }
                                });
                            })

                            if(this.ttl !== -1) {
                                this.changeStats({
                                        ttl: this.ttl - 1,
                                    updateServer: true
                                })
                            }
                            this.updateMarkers()
                        }, 1000)

                        GameModule.status().then((json) => {
                            if(json.started) {
                                console.log("la partie a commencé")
                                this.changeGame(true)
                            }

                            if(json.geoRessources.list[this.login]) {
                                console.log("la partie est déja rejointe")
                                this.getStats()
                                this.join()
                            }
                        })

                        window.location.href = "/#/";
                        this.pseudo = ""
                        this.password = ""
                    }
                })
            },
            logout () {
                LogModule.logout().then((response) => {
                    clearInterval(this.loop)
                    this.resetStats()
                })
            }
        },
    }
</script>

<style lang="scss">
    .login-form {
        position: absolute;
        right: 0;
        top: 0;
        padding-right: 1rem;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        color: white;

        .error {
            position: absolute;
            width: 100vw;
            top: 5rem;
            right: 0;
            background-color: rgb(179, 13, 13);
            text-align: center;
            color: white;
            padding: 2rem 0;
            font-size: 1.5rem;
        }

        label {
            margin: 0 1rem;
        }
        
        input {
            color: black;

            &[type=submit] {
                margin-left: 2rem;
            }
        }

        div {
            display: inline;
        }
    }
</style>