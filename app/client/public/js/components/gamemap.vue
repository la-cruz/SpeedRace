<template>
    <section>
        <h2>{{ title }}</h2>
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

            DataModule.list().then((data) => {
                Object.values(data.list).map((elem) => {
                    if(elem.position.length > 0) {
                        this.addMarker({
                            markerLat: parseFloat(elem.position[0]),
                            markerLon: parseFloat(elem.position[1]),
                            message: elem.id,
                            circle: elem.blurred
                        })
                    }
                })

                this.updateMap()
            })

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

<style>

</style>