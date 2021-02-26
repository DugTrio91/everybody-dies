<template>
  <div>
    <h1>The Alcoholic</h1>
    <loading :player="currentPlayer.name" v-if="loading"/>
    <p v-if="!loading">{{ currentPlayer.name }}, you must take {{ drinks | readableDrinks }}!</p>
    <dismiss :loading="loading" @click="dismiss">Dismiss</dismiss>
  </div>
</template>

<script>
  import { dice } from '@/mixins/dice';
  import { mapGetters } from 'vuex';
  import Dismiss from '@/components/controls/Dismiss';
  import Loading from '@/components/Loading';

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
      }, this.loadingTimer());
    },
    methods: {
      dismiss() {
        this.$emit('dismissed');
      },
      toggleLoading() {
        this.loading = !this.loading;
      },
    },
    components: {
      Dismiss,
      Loading,
    },
  };
</script>
