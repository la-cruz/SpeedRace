import Vue from "vue/dist/vue.esm.browser"
import Vuex from "vuex"
import VueRouter from "vue-router"
import L from "leaflet"
import VueSweetalert2 from 'vue-sweetalert2';

import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('font-awesome-icon', FontAwesomeIcon)

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
};

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow,
});

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueSweetalert2)

const router = new VueRouter({
    mode: "hash",
    routes: [
        {
            path: '/',
            component: require('./components/GameCreate.vue').default
        },
        {
            path: '/game',
            component: require('./components/Game.vue').default
        },
        {
            path: '/stats',
            component: require('./components/Stats.vue').default
        },
        {
            path: '/trophies',
            component: require('./components/Trophies.vue').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

new Vue({
    el: "#app",
    router,
    render: h => h(require('./App.vue').default)
});
