<template>
    <section class="page statistique">
        <div class="container-statistique">
            <h1><font-awesome-icon icon="chart-bar" />Statistique de {{ login }}</h1>
            <hr>
            <ul>
                <li><span>Role :</span> {{ stats.role }}</li>
                <li><span>Position :</span> {{ stats.position }}</li>
                <li><span>Time to live :</span> {{ stats.ttl }}</li>
                <li><span>Image :</span> {{ stats.url }}</li>
                <li><span>Flouté ? :</span> {{ stats.blurred }}</li>
                <li><span>Status :</span> {{ stats.status }}</li>
            </ul>
            <hr>
            <form @submit.prevent>
                <label for="newImage">Nouvelle image :</label><input type="text" name="newImage" v-model="url" />
                <button type="submit" @click.prevent="changeImage">Changer</button>
            </form>
        </div>
    </section>
</template>

<script>
    import store from '../stores/store'
    import Vuex from 'vuex'
    import DataModule from '../libraries/DataModule'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faChartBar } from '@fortawesome/free-solid-svg-icons'
    library.add(faChartBar)

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
        height: calc(100vh - 5rem);
        display: flex;
        justify-content: center;
        align-items: center;

        .container-statistique {
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: white;
            border-radius: 10px;
            padding: 2rem 3rem;
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);

            h1 {
                color: rgb(56, 56, 56);
                font-size: 1.2rem;
                text-transform: uppercase;
                font-weight: bold;
                text-align: center;

                svg {
                    color: #FFCD00;
                    margin-right: 1rem;
                }
            }

            hr {
                width: 100%;
                height: 4px;
                border: none;
                margin: 2rem 0;
                background-color: #FFCD00;
                text-align: center;
            }
    
            ul {
                display: flex;
                flex-direction: column;
                justify-content: center;
    
                li {
                    margin: 1rem 0;
                    color: rgb(56, 56, 56);
                    font-size: 1.1rem;
    
                    span {
                        color: #FFCD00;
                        font-weight: bold;
                        padding-right: 1rem;
                        font-size: 1.3rem;
                    }
                }
            }
    
            form {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-evenly;

                label {
                    color: rgb(56, 56, 56);
                    margin-right: 1rem;
                    font-size: 1.1rem;
                    text-transform: uppercase;
                    font-weight: bold;
                }

                input {
                    color: black;
                    border: solid 2px rgba(56, 56, 56, 0.5);
                    border-radius: 10px;
                    outline: none;
                    padding: 0.5rem 0.5rem;
                }
    
                button {
                    background-color: #FFCD00;
                    width: max-content;
                    font-size: 1.2rem;
                    color: white;
                    border: none;
                    border-radius: 50px;
                    text-transform: uppercase;
                    padding: 0.8rem 1rem;
                    margin-left: 1rem;
                    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
                }
            }
        }
    }
</style>