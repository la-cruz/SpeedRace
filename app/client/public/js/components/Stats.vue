<template>
    <section class="statistique">
        <h1>Statistique de {{ login }}</h1>
        <ul>
            <li><span>Role :</span> {{ stats.role }}</li>
            <li><span>Position :</span> {{ stats.position }}</li>
            <li><span>Time to live :</span> {{ stats.ttl }}</li>
            <li><span>Image :</span> {{ stats.url }}</li>
            <li><span>Flouté ? :</span> {{ stats.blurred }}</li>
            <li><span>Status :</span> {{ stats.status }}</li>
        </ul>
        <form @submit.prevent>
            <label for="newImage">Nouvelle image :</label><input type="text" name="newImage" v-model="url" />
            <button type="submit" @click.prevent="changeImage">Changer</button>
        </form>
    </section>
</template>

<script>
    import store from '../stores/store'
    import Vuex from 'vuex'
    import DataModule from '../libraries/DataModule'

    export default {
        name: 'Stats',
        store,
        data: function () {
            return {
                stats: {},
                url: ""
            }
        },
        computed: {
            ...Vuex.mapGetters([
                'login'
            ])
        },
        methods: {
            changeImage () {
                DataModule.changeImage(this.login, this.url)
                this.url = ""
                DataModule.stats(this.login)
                .then((response) => {
                    this.stats = response
                })
            }
        },
        created() {
            DataModule.stats(this.login)
            .then((response) => {
                this.stats = response
            })
        },
    }
</script>

<style lang="scss">
    .statistique {
        padding-top: 10rem;

        h1 {
            margin-bottom: 3rem;
        }

        ul {
            width: 70%;
            margin: auto;

            li {
                position: relative;
                display: flex;
                justify-content: space-between;
                margin: 1rem 0;

                span {
                    color: yellow;
                    font-weight: bold;
                }
            }
        }

        form {
            margin-top: 3rem;
            width: 70%;
            margin: 0 auto;
            display: flex;
            justify-content: space-evenly;

            button {
                color: black;
                margin-left: 1rem;
            }
        }
    }
</style>