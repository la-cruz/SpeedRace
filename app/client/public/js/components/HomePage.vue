<template>
    <section class="home-page">
        <h1>Speed Race</h1>
        <p> Connectez vous pour lancez une partie</p>
    </section>
</template>

<script>
    export default {
        name: 'HomePage'
    }
</script>

<style lang="scss">
    .home-page {
        width: 100%;
        padding-top: 5rem;
        display: flex;
        height: calc(100vh - 5rem);
        justify-content: center;
        align-items: center;
        flex-direction: column;

        h1 {
            font-size: 5rem;
            font-weight: bold;
        }

        p {
            margin-top: 2rem;
            font-size: 2rem;
        }
    }
</style>