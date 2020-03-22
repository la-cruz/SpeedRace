<template>
    <section>
        <h2>{{ title }}</h2>
        <form class="pure-form pure-form-stacked" @submit.prevent>
            <fieldset>
                <label for="lat"> Lattitude :</label> <input type="number" name="lat" step=any v-model="latitude" @change="updateMap">
                <label for="lon"> Longitude :</label> <input type="number" name="lon" step=any v-model="longitude" @change="updateMap">
                <label for="zoom"> Zoom :</label> <input type="range" name="zoom" min="1" max="20" v-model="zoom" @change="updateMap">
                <input type="submit" value="Afficher" class="pure-button pure-button-active" @click="updateMap">
            </fieldset>
        </form>
    </section>
</template>

<script>
    import store from '../stores/mapStore'
    import Vuex from 'vuex'

    export default {
        store: store,
        name: 'formmap',
        props: {
            title: String
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

<style>

</style>