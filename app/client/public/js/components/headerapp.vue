<template>
    <header>
        <h1>{{ message }}</h1>
    </header>
</template>

<script>
    export default {
        name: 'headerapp',
        props: {
            message: String
        }
    }
</script>

<style>

</style>