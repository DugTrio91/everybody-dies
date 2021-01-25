<template>
  <div>
    <input
      type="text"
      v-model="player.name"
    >
    <button @click="deletePlayer(player)">Delete</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    methods: {
      ...mapActions([
        'deletePlayer',
      ]),
    },
    props: ['player'],
  };
</script>
