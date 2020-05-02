<template>
    <section class="container-map">
        <!-- <h2>{{ title }}</h2> -->
        <div id="map"></div>
    </section>
</template>

<script>
    import DataModule from '../libraries/DataModule'
    import store from "../stores/store"
    import Vuex from "vuex"

    export default {
        name: 'GameMap',
        store: store,
        props: {
            title: {
                type: String,
                default: 'Carte',
            }
        },
        mounted() {
            this.changeMap(L.map('map'));
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibTFpZjEzIiwiYSI6ImNqczBubmhyajFnMnY0YWx4c2FwMmRtbm4ifQ.O6W7HeTW3UvOVgjCiPrdsA', {
                maxZoom: 20,
                minZoom: 1,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(this.map);

            this.updateMap()
        },
        methods: {
            ...Vuex.mapActions([
                'updateMap',
                'addMarker',
                'changeMap'
            ])
        },
        computed: {
            ...Vuex.mapGetters([
                'map',
                'latitude',
                'longitude'
            ])
        }
    }
</script>

<style lang="scss">

    .container-map {
        width: 100%;

        #map {
            height: calc(100vh - 5rem);
	        width: 100%; 
        }
    }
</style>