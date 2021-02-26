<template>
  <div class="l-donator-form donator-form">
    <slot class="l-donator-form__slot donator-form__slot"/>
    <div v-if="!donated">
      <p>{{ drinksToAssign | readableDrinks }} remaining!</p>
      <div
        class="l-donator-form__player donator-form__player"
        v-for="player in playersExceptCurrent"
        :key="player.id"
      >
        <p class="l-donator-form__player-name donator-form__player-name">{{ player.name }}:</p>
        <div class="l-donator-form__player-container donator-form__player-container">
          <action
            class="l-donator-form__player-button donator-form__player-button button button--plus"
            @click="assignDrinks(player)"
            :disable="disableAssignDrinks(player)"
          >
            +
          </action>
          <p class="l-donator-form__player-drinks donator-form__player-drinks">
            {{ player.donatedDrinks }}
          </p>
          <action
            class="l-donator-form__player-button donator-form__player-button button button--minus"
            @click="unassignDrinks(player)"
            :disable="disableUnassignDrinks(player)"
          >
            -
          </action>
        </div>
      </div>
    </div>
    <ul v-if="donated">
      <li v-for="player in playersExceptCurrent" :key="player.id">
        <span v-if="player.donatedDrinks > 0">
        {{ player.name }},
        <span v-if="player.multiplier">because you have the multiplier,</span>
        you must take {{ player.donatedDrinks | readableDrinks }}!
        </span>
      </li>
    </ul>
    <button
      class="l-donator-form__donate donator-form__donate"
      :class="{ 'disabled' : drinksToAssign !== 0 }"
      v-if="!donated"
      :disabled="drinksToAssign !== 0"
      @click="donate"
    >
      Donate
    </button>
    <dismiss v-if="donated" @click="dismiss">Dismiss</dismiss>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { dice } from '@/mixins/dice';
  import Dismiss from '@/components/controls/Dismiss';
  import Action from '@/components/controls/Action';

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
        this.playersExceptCurrent.forEach((player) => {
          if (player.multiplier) {
            player.donatedDrinks = dice.methods.multiply(player.donatedDrinks);
          }
        });
        this.$emit('donated');
      },
      dismiss() {
        this.$emit('dismissed');
      },
    },
    components: {
      Dismiss,
      Action,
    },
  };
</script>
<style lang="scss">
  @import "../../scss/app";

  .l-donator-form {

    &__player {
      display: inline-block;
      margin: 1rem;

      &-container {
        display: flex;
        align-items: center;
      }

      &-drinks {
        margin: 0;
        width: 3rem;
      }
    }

    &__donate {
      height: 6rem;
      width: 13rem;
      margin-top: 2rem;
      background: url('~@/assets/buttons/button-dismiss.png') center no-repeat;
      background-size: contain;
      outline: none;
      border: 0;
      font-family: $ed-body-font;
      font-size: 1.5rem;
      color: #fff;

      &.disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(.disabled):hover {
        background: url('~@/assets/buttons/button-dismiss-hover.png') center no-repeat;
        background-size: contain;
      }
    }
  }
</style>
