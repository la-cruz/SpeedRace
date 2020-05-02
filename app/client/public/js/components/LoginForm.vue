<template>
    <form class="login-form" @submit.prevent>
        <div class="error" v-if="error">
            {{ errorMessage }}
        </div>
        <div v-if="!connected" class="input-container">
            <div class="reverse-input">
                <input type="text" v-model="pseudo">
                <label>Login : </label>
            </div>
            <div class="reverse-input">
                <input type="password" v-model="password">
                <label>Mot de passe : </label>
            </div>
        </div>
        <input type="submit" class="btn" value="Connexion" @click="connection" v-if="!connected">
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
                loop: null,
                watchPos: null
            }
        },
        computed: {
            ...Vuex.mapGetters([
                'connected',
                'login',
                'latitude',
                'longitude',
                'latitudeTarget',
                'longitudeTarget',
                'markers',
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
                'changeWinner',
                'addMarker',
                'removeMarker',
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

                        this.watchPos = navigator.geolocation.watchPosition((position) => {
                            this.changeLat(position.coords.latitude)
                            this.changeLon(position.coords.longitude)
                            this.addMarker({
                                markerLat: position.coords.latitude,
                                markerLon: position.coords.longitude,
                                message: this.login
                            })

                            let target = L.latLng(parseFloat(this.latitudeTarget), parseFloat(this.longitudeTarget))
                            let playerPosition = L.latLng(parseFloat(this.latitude), parseFloat(this.longitude))

                            if(target.distanceTo(playerPosition) < 200) {
                                GameModule.win(this.login)
                                this.changeStats({
                                    status: "winner",
                                    updateServer: true
                                })
                            }

                            DataModule.changePosition(this.login, position.coords.latitude, position.coords.longitude)
                            this.updateMap()
                        });

                        this.loop = setInterval(() =>{
                            DataModule.list().then((json) => {
                                Object.keys(json.list).forEach((key) => {

                                    let player = json.list[key]

                                    if(player.status === "winner") {
                                        this.changeWinner(player.id)
                                        clearInterval(this.loop)
                                        navigator.geolocation.clearWatch(this.watchPos)
                                    }

                                    if(player.status !== "dead"){
                                        this.addMarker({
                                            markerLat: parseFloat(player.position[0]),
                                            markerLon: parseFloat(player.position[1]),
                                            message: player.id,
                                            circle: player.blurred
                                        })
                                    } else {
                                        this.removeMarker(player.id)
                                    }

                                    if(player.id === "target") {
                                        this.changeTargetPosition({
                                            newLat: player.position[0], 
                                            newLon: player.position[1]
                                        })
                                    }
                                });
                            })

                            if(this.ttl > 0) {
                                this.changeStats({
                                    ttl: this.ttl - 1,
                                    updateServer: true
                                })

                                if(this.ttl === 0) {
                                    navigator.geolocation.clearWatch(this.watchPos)
                                    this.changeStats({
                                        status: "dead",
                                        updateServer: true
                                    })
                                }
                            }
                            this.updateMarkers()
                        }, 1000)

                        GameModule.status().then((json) => {
                            if(json.started) {
                                this.changeGame(true)
                            }

                            if(json.geoRessources.list[this.login]) {
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
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

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

        .input-container {
            width: 100%;
            display: flex;
            flex-direction: column;

            .reverse-input {
                display: flex;
                flex-direction: column-reverse;

                input {
                    border: solid 2px rgba(56, 56, 56, 0.5);
                    border-radius: 10px;
                    outline: none;
                    padding: 0.5rem 0;
                    text-align: center;

                    &:focus-within {
                        border-color: #FFCD00;

                        + label {
                            color: #FFCD00;
                        }
                    }
                }
            }

        }

        label {
            color: rgb(56, 56, 56);
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
    }
</style>