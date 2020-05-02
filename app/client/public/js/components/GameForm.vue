<template>
    <section class="container-pos-settings">
        <h2 class="title-form-game"><font-awesome-icon icon="map-marker-alt" />{{ title }}</h2>
        <form class="pure-form pure-form-stacked" @submit.prevent>
            <fieldset>
                <label for="lat"> Lattitude :</label><input type="number" name="lat" step="0.0001" v-model="latitude" @change="updateMap">
                <label for="lon"> Longitude :</label><input type="number" name="lon" step="0.0001" v-model="longitude" @change="updateMap">
                <label for="zoom"> Zoom :</label> <input type="range" name="zoom" min="1" max="20" v-model="zoom" @change="updateMap">
                <input type="submit" value="Afficher" @click="updateMap">
            </fieldset>
        </form>
    </section>
</template>

<script>
    import store from '../stores/store'
    import Vuex from 'vuex'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
    library.add(faMapMarkerAlt)

    export default {
        store: store,
        name: 'GameForm',
        props: {
            title: {
                type: String,
                default: 'Position',
            }
        },
        methods: {
            ...Vuex.mapActions([
                'updateMap',
                'changeLon',
                'changeLat',
                'changeZoom'
            ])
        },
        computed: {
            latitude: {
                get () {
                    return this.$store.getters.latitude
                },
                set (value) {
                    this.changeLat(value)
                }
            },
            longitude: {
                get () {
                    return this.$store.getters.longitude
                },
                set (value) {
                    this.changeLon(value)
                }
            },
            zoom: {
                get () {
                    return this.$store.getters.zoom
                },
                set (value) {
                    this.changeZoom(value)
                }
            }
        },
    }
</script>

<style lang="scss">

    .container-pos-settings {
        .title-form-game {
            color: rgb(56, 56, 56);
            text-align: center;
            font-size: 1.3rem;
            text-transform: uppercase;
            font-weight: bold;
            margin: 0.5rem;

            svg {
                color: #FFCD00;
                font-size: 2rem;
                padding-right: 0.5rem;
            }
        }
    
        form {
            width: 100%;
    
            label {
                color: rgb(56, 56, 56);
                margin: 1rem 0 0.5rem 0;
                font-size: 1rem;
                text-transform: uppercase;
                font-weight: bold;
            }
    
            input {
                color: black;
                width: 100%;
    
                &[type="submit"] {
                    background-color: #FFCD00;
                    color: white !important;
                    text-transform: uppercase;
                    border: none;
                    border-radius: 10px;
                    margin-top: 1rem;
                    padding: 0.5rem 0;
                    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
                    outline: none;
                    transition: 0.5s;
    
                    &:hover {
                        transform: scale(1.05);
                        transition: 0.5s;
                    }
                }
            }
        }
    }

</style>