<template>
  <div>
    <h1>The Percentile</h1>
    <loading :player="currentPlayer.name" v-if="loading"/>
    <p v-if="!loading">{{ currentPlayer.name }}, you must drink {{ percentage }}% of your drink!</p>
    <p v-if="!loading">This is unaffected by the multiplier.</p>
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
