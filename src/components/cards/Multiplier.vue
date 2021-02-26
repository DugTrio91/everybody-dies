<template>
  <div>
    <h1>The Multiplier</h1>
    <p>
      {{ currentPlayer.name }}, The Multiplier will stay with you until the end of your next turn.
      Whenever you must drink, The Multiplier will times the number of drinks by up to 4.
      Some specific rules are exempt from The Multiplier. Good Luck!
    </p>
    <dismiss @click="dismiss">Dismiss</dismiss>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  import Dismiss from '@/components/controls/Dismiss';

  export default {
    computed: {
      ...mapGetters([
        'currentPlayer',
        'players',
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
    components: {
      Dismiss
    }
  };
</script>
