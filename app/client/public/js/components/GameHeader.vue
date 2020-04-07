<template>
    <header>
        <h1>{{ message }}</h1>
    </header>
</template>

<script>
    export default {
        name: 'GameHeader',
        props: {
            message: {
                type: String,
                default: "MifMapApp",
            }
        }
    }
</script>

<style>

</style>