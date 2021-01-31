<template>
  <div>
    <h1>The Alcoholic</h1>
    <p v-if="loading">{{ currentPlayer.name }}, please wait while your fate is decided...</p>
    <p v-if="!loading">{{ currentPlayer.name }}, you must take {{ drinks }} drink(s)!</p>
    <button @click="dismiss">Dismiss</button>
  </div>
</template>

<script>
  import { dice } from '@/mixins/dice';
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        loading: true,
        drinks: 0,
      };
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
      ]),
    },
    created() {
      setTimeout(() => {
        this.drinks = dice.methods.roll(4, this.currentPlayer.multiplier);
        this.toggleLoading();
      }, 1500);
    },
    methods: {
      dismiss() {
        this.$emit('dismissed');
      },
      toggleLoading() {
        this.loading = !this.loading;
      },
    },
  };
</script>
