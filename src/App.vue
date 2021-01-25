<template>
  <div>
    <h1>Everybody Dies</h1>
    <component :is="activeComponent"/>
  </div>
</template>

<script>
  import Players from './components/players/Players.vue';

  export default {
    computed: {
      activeComponent() {
        return 'players';
      },
    },
    components: {
      Players,
    },
  };
</script>
