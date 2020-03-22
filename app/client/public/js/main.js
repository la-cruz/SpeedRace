import Vue from "vue/dist/vue.esm.browser"
import Vuex from "vuex"
import VueRouter from "vue-router"

Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
    mode: "hash",
    routes: [
        {
            path: '/',
            component: require('./components/creategame.vue').default
        },
        {
            path: '/game',
            component: require('./components/map.vue').default
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
    render: h => h(require('./App.vue').default),
});
