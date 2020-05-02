<template>
    <nav class="main-nav" v-if="connected">
        <ul v-if="connected">
            <li><a href="/#/">Accueil</a></li>
            <li v-if="gameJoined"><a href="/#/game">Jeu</a></li>
            <li v-if="gameJoined"><a href="/#/stats">Statistique</a></li>
            <li v-if="gameJoined"><a href="/#/trophies">Trophée</a></li>
        </ul>
        <login-form></login-form>
    </nav>
</template>

<script>
    import LoginForm from './LoginForm.vue'
    import store from '../stores/store'
    import Vuex from 'vuex'

    export default {
        name: "NavMenu",
        store: store,
        components: { LoginForm },
        computed: {
            ...Vuex.mapGetters([
                'connected',
                'gameJoined'
            ])
        },
    }
</script>

<style lang="scss">
    .main-nav {
        width: 100vw;
        height: 5rem;
        display: flex;
        justify-content: flex-start;
        background-color: rgb(32, 32, 32);
        position: fixed;
        top: 0;
        left: 0;
        box-shadow: 0 13px 20px -27px #fff;

        ul {
            margin-left: 3rem;
            display: flex;
            justify-content: space-between;
            min-width: 30rem;
            list-style: none;
            height: 100%;

            li {
                text-transform: uppercase;
                display: flex;
                align-items: center;

                a {
                    text-decoration: none;
                    color: white;
                    font-weight: bold;
                    transition: 0.2s;
                    font-size: 1.3rem;

                    &:hover {
                        color: #FFCD00;
                    }
                }
            }
        }
    }
</style>