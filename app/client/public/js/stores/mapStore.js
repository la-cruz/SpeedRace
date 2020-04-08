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
        console.log("j'update les markers")
        if(state.markersLayer) {
            state.markersLayer.clearLayers()
        }
        if(state.map) {
            state.markersLayer = L.layerGroup().addTo(state.map)
        }
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
    UPDATE_MARKER: (state, {index, newLat, newLon, newCirle}) => {

        console.log("j'essaye d'update le marker de ", index)

        let marker = state.markers.filter(elem => elem.message === index)

        if(newCirle) {
            marker[0].circle = newCirle
        }

        marker[0].lat = newLat
        marker[0].lon = newLon
    },
    ADD_MARKER: (state, {markerLat, markerLon, message, circle}) => {

        console.log("j'ajoute vraiment le marker de : ", message)
        state.markers.push({
            lat: markerLat,
            lon: markerLon,
            message: message,
            circle: circle
        })
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
    updateMarker: (store, {index, newLat, newLon, newCirle}) => {
        store.commit('UPDATE_MARKER', {index, newLat, newLon, newCirle})
        store.commit('UPDATE_MARKERS')
    },
    addMarker: (store, {markerLat, markerLon, message, circle}) => {
        if(store.state.markers.filter(elem => elem.message === message).length > 0) {
            store.commit('UPDATE_MARKER', {
                index: message, 
                newLat: markerLat, 
                newLon: markerLon, 
                newCircle: circle
            })
            store.commit('UPDATE_MARKERS')
        } else {
            store.commit('ADD_MARKER', {markerLat, markerLon, message, circle})
        }

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