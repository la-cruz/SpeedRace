import "purecss/build/pure-min.css";
import "leaflet/dist/leaflet.css";
import Vue from "../../node_modules/vue/dist/vue.esm.browser"
import '../css/style.css';
import "./form";
import "./map";

new Vue({
    el: "#app",
    data: {
        message: 'Hello Vue 2.6.0-beta1 ESM Browser Build!'
    }
});