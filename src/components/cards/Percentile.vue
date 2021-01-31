<template>
  <div>
    <h1>The Percentile</h1>
    <p v-if="loading">{{ currentPlayer.name }}, please wait while your fate is decided...</p>
    <p v-if="!loading">{{ currentPlayer.name }}, you must drink {{ percentage }}% of your drink!</p>
    <p v-if="!loading">This is unaffected by the randomiser.</p>
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
        percentage: 0,
      };
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
      ]),
    },
    created() {
      setTimeout(() => {
        this.percentage = dice.methods.roll(10) * 10;
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
