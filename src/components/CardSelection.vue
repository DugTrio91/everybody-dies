<template>
  <div class="l-card-selection card-selection">
    <button
      class="l-card-selection__card card-selection__card"
      v-for="(card, index) in shuffledCards"
      :key="index"
      @click="endTurn"
    >
      {{ card }}
    </button>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'cards',
      ]),
      shuffledCards() {
        return this.shuffle(this.cards);
      },
    },
    methods: {
      ...mapActions([
        'nextPlayer',
      ]),
      shuffle(deck) {
        return deck.sort(() => Math.random() - 0.5);
      },
      endTurn() {
        this.nextPlayer();
      },
    },
  };
</script>

<style lang="scss">
  .l-card-selection {
    &__card {
      height: 100px;
    }
  }
</style>
