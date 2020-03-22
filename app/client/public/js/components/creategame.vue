<template>
    <section>
        <h2>{{ title }}</h2>
        <form class="pure-form pure-form-stacked" @submit.prevent>
            <fieldset>
                <label for="name"> Nom de la partie :</label><input type="text" />
                <input type="submit" value="Creer la partie" />
            </fieldset>
        </form>
    </section>
</template>

<script>
    export default {
        name: 'creategame',
        props: {
            title: {type: String, default: "Creer une partie"}
        }
    }
</script>

<style>
</style>