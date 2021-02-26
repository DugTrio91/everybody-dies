<template>
  <div class="l-card-selection card-selection">
    <h2>{{ currentPlayer.name }}, choose a card</h2>
    <div class="l-card-selection__cards card-selection__cards">
      <card
        v-for="(card, index) in shuffledCards"
        :card="card"
        :selected="selectedCard"
        :key="index"
        @click="selectCard(card)"
      />
    </div>
    <component
      class="l-card-selection__selected"
      :is="selectedCard"
      @dismissed="endTurn"
    />
  </div>
</template>

<script>
  import Multiplier from './cards/Multiplier.vue';
  import Randomiser from './cards/Randomiser.vue';
  import Alcoholic from './cards/Alcoholic.vue';
  import Percentile from './cards/Percentile.vue';
  import Avalanche from './cards/Avalanche.vue';
  import Donator from './cards/Donator.vue';
  import Card from './Card.vue';

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
        'currentPlayer',
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
      selectCard(card) {
        this.selectedCard = card;
      },
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
      endTurn() {
        this.showAllCards();

        // Allow transition to finish before shuffling
        setTimeout(() => {
          this.shuffle();
          this.removeMultiplierFromDeckIfActive();
          this.nextPlayer();
        }, 600);
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
      Card,
    },
  };
</script>

<style lang="scss">
  @import "../scss/app";

  .l-card-selection {
    position: relative;
    text-align: center;

    &__cards {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__selected {
      position: relative;
      z-index: 3;
      margin: 2rem auto 0;
      max-width: 45rem;
    }
  }
</style>
