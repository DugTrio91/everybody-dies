<template>
  <div class="l-card-selection card-selection">
    <button
      class="l-card-selection__card card-selection__card"
      v-for="(card, index) in shuffledCards"
      :key="index"
      @click="revealCard(card)"
      :disabled="selectedCard"
    >
      {{ card }}
    </button>
    <component :is="selectedCard" @dismissed="endTurn" @testing="console.log('TEST')"/>
  </div>
</template>

<script>
  import Multiplier from './cards/Multiplier.vue';
  import Randomiser from './cards/Randomiser.vue';
  import Alcoholic from './cards/Alcoholic.vue';
  import Percentile from './cards/Percentile.vue';
  import Avalanche from './cards/Avalanche.vue';
  import Donator from './cards/Donator.vue';

  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        selectedCard: null,
        filteredCards: [],
      };
    },
    computed: {
      ...mapGetters([
        'cards',
        'multiplierActive',
      ]),
      shuffledCards() {
        return this.shuffle();
      },
    },
    created() {
      this.removeMultiplierFromDeckIfActive();
    },
    methods: {
      ...mapActions([
        'nextPlayer',
      ]),
      shuffle() {
        return this.filteredCards.sort(() => Math.random() - 0.5);
      },
      removeMultiplierFromDeckIfActive() {
        if (!this.multiplierActive) {
          this.filteredCards = this.cards;
        } else {
          this.filteredCards = this.cards.filter(card => card !== 'multiplier');
        }
      },
      revealCard(card) {
        this.selectedCard = card;
      },
      endTurn() {
        this.nextPlayer();
        this.removeMultiplierFromDeckIfActive();
        this.shuffle();
        this.showAllCards();
      },
      showAllCards() {
        this.selectedCard = null;
      },
    },
    components: {
      Multiplier,
      Randomiser,
      Alcoholic,
      Percentile,
      Avalanche,
      Donator,
    },
  };
</script>

<style lang="scss">
  .l-card-selection {
    &__card {
      height: 100px;
      width: 75px;
    }
  }
</style>
