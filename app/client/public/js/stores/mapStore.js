import Vuex from "vuex"
import L from "leaflet"

let state = {
    lat: 45.782,
    lon: 4.8656,
    zoom: 15,
    map: null
}

let getters = {
    latitude: state => state.lat,
    longitude: state => state.lon,
    zoom: state => state.zoom,
    map: state => state.map
}

let mutations = {
    CHANGE_LAT: (state, newLat) => {
        state.lat = newLat
    },
    CHANGE_LON: (state, newLon) => {
        state.lon = newLon
    },
    CHANGE_ZOOM: (state, newZoom) => {
        state.zoom = newZoom
    },
    CHANGE_MAP: (state, map) => {
        state.map = map
    },
    UPDATE_MAP: (state) => {
        if(state.map) {
            state.map.setView([state.lat, state.lon], state.zoom)
        }
    },
    ADD_MARKER: (state, {markerLat, markerLon, message}) => {
        L.marker([markerLat, markerLon]).addTo(state.map).bindPopup(message)
    }
}

let actions = {
    updateMap: (store) => {
        store.commit('UPDATE_MAP')
    },
    addMarker: (store, {markerLat, markerLon, message}) => {
        store.commit('ADD_MARKER', {markerLat, markerLon, message})
    },
    changeMap: (store, map) => {
        store.commit('CHANGE_MAP', map)
    },
    changeLat: (store, newLat) => {
        store.commit('CHANGE_LAT', newLat)
    },
    changeLon: (store, newLon) => {
        store.commit('CHANGE_LON', newLon)
    },
    changeZoom: (store, newZoom) => {
        store.commit('CHANGE_ZOOM', newZoom)
    }
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})