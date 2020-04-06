import L from "leaflet"

let state = {
    lat: 45.782,
    lon: 4.8656,
    zoom: 15,
    map: null,
    markersLayer: null,
    markers: []
}

let getters = {
    latitude: state => state.lat,
    longitude: state => state.lon,
    zoom: state => state.zoom,
    map: state => state.map,
    markersLayer: state => state.markersLayer,
    markers: state => state.marker
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
    CHANGE_MARKERS_LAYER: (state, layer) => {
        state.markersLayer = layer
    },
    UPDATE_MAP: (state) => {
        if(state.map) {
            state.map.setView([state.lat, state.lon], state.zoom)
        }
    },
    UPDATE_MARKERS: (state) => {
        if(state.markersLayer) {
            state.markersLayer.clearLayers()
        }
        state.markersLayer = L.layerGroup().addTo(state.map)
        state.markers.forEach((marker) => {
            if(marker.circle) {
                L.circle([marker.lat, marker.lon], {
                    color: "red",
                    fillColor: "#f03",
                    fillOpacity: 0.5,
                    radius: 200
                }).addTo(state.map).bindPopup(marker.message)
            } else {
                L.marker([marker.lat, marker.lon]).addTo(state.markersLayer).bindPopup(marker.message)
            } 
        })
    },
    ADD_MARKER: (state, {markerLat, markerLon, message, circle}) => {
        var bool = true

        state.markers.map((elem) => {
            if(elem.message === message) {
                bool=false
            }
        })
        if(bool) {
            state.markers.push({
                lat: markerLat,
                lon: markerLon,
                message: message,
                circle: circle
            })
        }
    }
}

let actions = {
    updateMap: (store) => {
        store.commit('UPDATE_MAP')
        store.commit('UPDATE_MARKERS')
    },
    updateMarkers: (store) => {
        store.commit('UPDATE_MARKERS')
    },
    addMarker: (store, {markerLat, markerLon, message, circle}) => {
        store.commit('ADD_MARKER', {markerLat, markerLon, message, circle})
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

const moduleMap = {
    state,
    mutations,
    getters,
    actions
}

export default moduleMap