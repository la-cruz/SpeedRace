<template>
    <section class="trophies">
        <h1>Trophée de {{ login }}</h1>
        <ul>
            <li v-for="trophy in trophies" :key="trophy.id">{{ trophy.id }}</li>
        </ul>
    </section>
</template>

<script>
    import store from '../stores/store'
    import Vuex from 'vuex'
    import DataModule from '../libraries/DataModule'

    export default {
        name: 'Trophies',
        store,
        data: function () {
            return {
                trophies: []
            }
        },
        computed: {
            ...Vuex.mapGetters([
                'login'
            ])
        },
        created() {
            DataModule.trophies(this.login)
            .then((response) => {
                this.trophies = response
            })
        }
    }
</script>

<style lang="scss">
    .trophies {
        padding-top: 10rem;

        h1 {
            margin-bottom: 3rem;
        }

        ul {
            li {
                
            }
        }
    }
</style>