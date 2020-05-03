<template>
    <section class="home-page">
        <div class="container-login">
            <!-- <h1>Speed Race</h1> -->
            <p> Connectez vous pour lancez une partie</p>
            <hr>
            <login-form></login-form>
        </div>
    </section>
</template>

<script>
    import LoginForm from './LoginForm.vue'
    import store from '../stores/store'
    import Vuex from 'vuex'

    export default {
        name: 'HomePage',
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
    .home-page {
        width: 100%;
        display: flex;
        height: calc(100vh);
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: rgb(56, 56, 56);

        .container-login {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: white;
            border-radius: 10px;
            padding: 1rem 3rem;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);

            // h1 {
            //     font-size: 3rem;
            //     font-weight: bold;
            //     text-transform: uppercase;
            //     text-align: center;
            //     color: rgb(56, 56, 56);
            // }
    
            p {
                margin: 2rem 0;
                font-size: 1.2rem;
                color: rgb(56, 56, 56);
                text-transform: uppercase;
                font-weight: bold;
                text-align: center;
            }

            hr {
                width: 80%;
                height: 4px;
                border: none;
                margin-bottom: 1rem;
                background-color: #FFCD00;
            }

            @media (max-width: 576px) { 
                width: 70%;
                padding: 1rem 2rem;
            }
        }

    }
</style>