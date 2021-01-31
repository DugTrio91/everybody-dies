<template>
  <div>
    <h1>The Multiplier</h1>
    <p>Add rules for the Multiplier here</p>
    <button @click="dismiss">Dismiss</button>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'currentPlayer',
        'players'
      ]),
    },
    created() {
      this.activateMultiplier(this.players.length + 1);
      this.setMultiplierToPlayer(this.currentPlayer);
    },
    methods: {
      ...mapActions([
        'activateMultiplier',
        'setMultiplierToPlayer',
      ]),
      dismiss() {
        this.$emit('dismissed');
      },
    },
  };
</script>
