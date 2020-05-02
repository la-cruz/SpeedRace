<template>
  <div class="container-page">
    <nav-menu></nav-menu>
    <router-view v-if="connected"></router-view>
    <home-page v-else></home-page>
    <div v-if="winner === login">Bravo, vous avez gagné</div>
    <div v-if="status === 'dead'">T'es mort lol</div>
    <div v-if="winner !== 'none' && winner !== login">Perdu, { winner } à gagné </div>
  </div>
</template>

<script>
  import NavMenu from "./components/NavMenu.vue"
  import HomePage from "./components/HomePage.vue"
  import store from "./stores/store"
  import Vuex from "vuex"

  export default {
      name: 'App',
      store: store,
      components: { NavMenu, HomePage },
      computed: {
        ...Vuex.mapGetters([
          'connected',
          'winner',
          'login',
          'status'
        ])
      }
  }
</script>

<style lang="scss">
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline; }

  /* HTML5 display-role reset for older browsers */

  h1 {
  font-size: 5rem;
  font-weight: bold;
  }

  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  display: block; }

  body {
  line-height: 1; 
  background-color: rgb(56, 56, 56);
  font-family: 'Montserrat', sans-serif;
  color: white;

    .container-page {
      width: 100vw;
    }
  }

  ol, ul {
  list-style: none; }

  blockquote, q {
  quotes: none; }

  blockquote {
  &:before, &:after {
    content: '';
    content: none; } }

  q {
  &:before, &:after {
    content: '';
    content: none; } }

  table {
  border-collapse: collapse;
  border-spacing: 0; }

  .page {
    padding-top: 5rem;
  }

  .btn {
    width: min-content;
    margin: 2rem 0 1rem 0;
    padding: 0.8rem 2rem;
    font-size: 1.3rem;
    background-color: #FFCD00;
    color: white !important; 
    text-transform: uppercase;
    border: none;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    outline: none;
    transition: 0.5s;
    text-align: center;
    text-decoration: none;

    &:hover {
        transform: scale(1.05);
        transition: 0.5s;
    }
  }

  .input-text {
    border: solid 2px rgba(56, 56, 56, 0.5);
    border-radius: 10px;
    outline: none;
    padding: 0.5rem 0;
    text-align: center;

    &:focus-within {
        border-color: #FFCD00;

        + label {
            color: #FFCD00;
        }
    }
  }
  // section {
  //   padding-top: 7rem;
  // }
</style>