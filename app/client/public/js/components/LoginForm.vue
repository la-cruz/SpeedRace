<template>
    <v-form ref="form" @submit.prevent>
        <v-alert backgroundColor="red" color="error" v-if="error">{{ errorMessage }}</v-alert>
        <v-text-field v-bind="pseudo" label="Pseudo" color="black" required></v-text-field>
        <v-text-field v-bind="password" label="Password" color="black" required></v-text-field>
        <v-btn v-if="!connected"><input type="submit" value="Connexion" @click="connection"></v-btn>
        <v-btn v-else><input type="submit" value="Déconnexion" @click="logout"></v-btn>
    </v-form>
</template>

<script>
    import LogModule from '../libraries/Connect'
    import DataModule from '../libraries/DataModule'
    import GameModule from '../libraries/GameHandler'
    import { VBtn, VAlert } from "vuetify/lib"
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
    // .login-form {
    //     position: absolute;
    //     right: 0;
    //     top: 0;
    //     padding-right: 1rem;
    //     height: 100%;
    //     display: flex;
    //     align-items: center;
    //     justify-content: space-evenly;
    //     color: white;

    //     .error {
    //         position: absolute;
    //         width: 100vw;
    //         top: 5rem;
    //         right: 0;
    //         background-color: rgb(179, 13, 13);
    //         text-align: center;
    //         color: white;
    //         padding: 2rem 0;
    //         font-size: 1.5rem;
    //     }

    //     label {
    //         margin: 0 1rem;
    //     }
        
    //     input {
    //         color: black;
    //     }

    //     div {
    //         display: inline;
    //     }
    // }
</style>