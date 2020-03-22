<template>
  <div>
    <headerapp message="MifMapApp"></headerapp>
    <formmap title="Position"></formmap>
    <gamemap title="Carte"></gamemap>
  </div>
</template>

<script>
    import headerapp from './headerapp.vue'
    import formmap from './formmap.vue'
    import gamemap from './gamemap.vue'

    export default {
        name: 'app',
        components: { headerapp, formmap, gamemap }
    }
</script>