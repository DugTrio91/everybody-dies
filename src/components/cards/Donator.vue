<template>
  <div>
    <h1>The Donator</h1>
    <loading :player="currentPlayer.name" v-if="loading"/>
    <div v-if="!loading">
      <p>
        {{ currentPlayer.name }}, you've been given {{ drinks | readableDrinks }} to donate!
      </p>
      <p v-if="!donated">
        Select who will you give them to (You can't donate more than 2 drinks to a player!):
      </p>
      <donator-form
        @dismissed="dismiss"
        @donated="donate"
        :drinks="drinks"
      />
    </div>
  </div>
</template>
<script>
  import DonatorForm from '../form/DonatorForm';
  import { mapGetters } from 'vuex';
  import { dice } from '@/mixins/dice';
  import Loading from '@/components/controls/Loading';

  export default {
    data() {
      return {
        loading: true,
        drinks: 0,
        donated: false,
      };
    },
    created() {
      setTimeout(() => {
        const roll = dice.methods.roll(6);
        this.drinks = roll > this.players.length ? this.players.length : roll;
        this.loading = false;
      }, this.loadingTimer());
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
        this.donated = false;
      },
      donate() {
        this.donated = true;
      },
    },
    components: {
      DonatorForm,
      Loading,
    },
  };
</script>
