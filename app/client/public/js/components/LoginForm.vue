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
        <!-- <button @click="emptyMarker">allo</button> -->
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
                errorMessage: ""
            }
        },
        computed: {
            ...Vuex.mapGetters([
                'connected',
                'login',
                'latitude',
                'longitude'
            ])
        },
        methods: {
            ...Vuex.mapActions([
                'changeLogin',
                'changeConnected',
                'changeLat',
                'changeLon',
                'changeGame',
                'addMarker',
                'updateMap',
                'updateMarkers'
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

                        setInterval(() =>{
                            DataModule.list().then((json) => {
                                Object.keys(json.list).forEach((key) => {
                                    this.addMarker({
                                        markerLat: parseFloat(json.list[key].position[0]),
                                        markerLon: parseFloat(json.list[key].position[1]),
                                        message: json.list[key].id,
                                        circle: json.list[key].blurred
                                    })
                                });
                            })

                            this.updateMarkers()
                        }, 10000)

                        GameModule.status().then((json) => {
                            if(json.started) {
                                 this.changeGame(true)
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
                    this.changeLogin("")
                    this.changeConnected(response)
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