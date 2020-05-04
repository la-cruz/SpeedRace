<template>
    <header>
        <h1 class="title-settings">{{ message }}</h1>
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

<style lang="scss">
    .title-settings {
        color: rgb(56, 56, 56);
        font-size: 1.5rem;
        text-transform: uppercase;
        font-weight: bold;
        border-radius: 10px;
        padding: 0.8rem 1rem;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);

        @media (max-width: 768px) { 
            display: none;
        }
    }
</style>