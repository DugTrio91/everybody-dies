<template>
  <div>
    <h1>The Donator</h1>
    <p v-if="loading">{{ currentPlayer.name }}, please wait while your fate is decided...</p>
    <div v-if="!loading">
      <p>
        {{ currentPlayer.name }}, the donator has given you {{ drinks }} to donate!
        <br>
        Select who will you give them to (You can't donate more than 2 drinks to a player!):
      </p>
      <donator-form @dismissed="dismiss" :drinks="drinks"/>
    </div>
  </div>
</template>
<script>
  import DonatorForm from '../../components/DonatorForm';
  import { mapGetters } from 'vuex';
  import { dice } from '@/mixins/dice';

  export default {
    data() {
      return {
        loading: true,
        drinks: 0,
      };
    },
    created() {
      setTimeout(() => {
        const roll = dice.methods.roll(6);
        this.drinks = roll > this.players.length ? this.players.length : roll;
        this.loading = false;
      }, 1500);
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
        'players',
      ]),
    },
    methods: {
      dismiss() {
        this.$emit('dismissed');
      },
    },
    components: {
      DonatorForm,
    },
  };
</script>
