<template>
  <div class="l-donator-form donator-form">
    <slot class="l-donator-form__slot donator-form__slot"/>
    <div v-if="!donated">
      <p>{{ drinksToAssign }} drink(s) remaining!</p>
      <div
        class="l-donator-form__player donator-form__player"
        v-for="player in playersExceptCurrent"
        :key="player.id"
      >
        <p class="l-donator-form__player-name donator-form__player-name">{{ player.name }}:</p>
        <p class="l-donator-form__player-drinks donator-form__player-drinks">
          {{ player.donatedDrinks }}
        </p>
        <button
          class="l-donator-form__player-button donator-form__player-button button button--plus"
          @click="assignDrinks(player)"
          :disabled="disableAssignDrinks(player)"
        >
          +
        </button>
        <button
          class="l-donator-form__player-button donator-form__player-button button button--minus"
          @click="unassignDrinks(player)"
          :disabled="disableUnassignDrinks(player)"
        >
          -
        </button>
      </div>
    </div>
    <ul v-if="donated">
      <li v-for="player in playersExceptCurrent" :key="player.id">
        {{ player.name }},
        <span v-if="player.multiplier">becuase you have the multiplier,</span>
        you must take {{ player.donatedDrinks }} drink(s)!
      </li>
    </ul>
    <button v-if="!donated" :disabled="drinksToAssign !== 0" @click="donate">Donate</button>
    <button v-if="donated" @click="dismiss">Dismiss</button>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { dice } from '@/mixins/dice';

  export default {
    data() {
      return {
        drinksToAssign: 0,
        donated: false,
        playersExceptCurrent: [],
      };
    },
    props: ['drinks'],
    created() {
      this.drinksToAssign = this.drinks;
      this.playersExceptCurrent = this.players.filter(player => player.id !== this.currentPlayer.id)
        .map(player => ({
          ...player,
          donatedDrinks: 0,
        }));
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
        'players',
      ]),
    },
    methods: {
      assignDrinks(player) {
        if (this.drinksToAssign > 0 && player.donatedDrinks <= 2) {
          player.donatedDrinks++;
          this.drinksToAssign--;
        }
      },
      unassignDrinks(player) {
        if (player.donatedDrinks > 0) {
          player.donatedDrinks--;
          this.drinksToAssign++;
        }
      },
      disableAssignDrinks(player) {
        return player.donatedDrinks >= 2 || this.drinksToAssign === 0;
      },
      disableUnassignDrinks(player) {
        return !player.donatedDrinks > 0;
      },
      donate() {
        this.donated = true;
        this.playersExceptCurrent.forEach((player, i) => {
          if (player.multiplier) {
            player.donatedDrinks = dice.methods.multiply(player.donatedDrinks);
          }

          if (player.donatedDrinks === 0) {
            this.playersExceptCurrent.splice(i, 1);
          }
        });
      },
      dismiss() {
        this.$emit('dismissed');
      },
    },
  };
</script>
<style lang="scss">
  .l-donator-form {
    &__player {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
</style>
