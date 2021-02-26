<template>
  <transition @after-leave="returnCard" :duration="1000">
    <div
      class="l-card card"
      :class="cardIsRevealed"
      @click="selectCard"
    >
      <div class="l-card__inner card__inner">
        <div class="l-card__front card__front" :class="`card__front--${card}`"/>
        <div class="l-card__back card__back"/>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: ['card', 'selected'],
    computed: {
      cardIsRevealed() {
        if (this.selected && this.selected !== this.card) {
          return 'disabled';
        } else if (this.selected === this.card) {
          return 'is-selected';
        }

        return '';
      },
    },
    methods: {
      returnCard() {
        this.$emit('card-returned');
      },
      selectCard() {
        if (this.cardIsRevealed !== 'disabled') {
          this.$emit('click');
        }
      },
    },
  };
</script>

<style lang="scss">
  @import "../scss/app";

  .l-card {
    height: 13rem;
    width: 9.5rem;
    margin: 1rem;

    &:not(.disabled):not(.is-selected):hover {
      margin: 1rem 2rem;
      transform: scale(1.25);
    }

    &.is-selected {
      position: absolute;
      top: 0;
      transform: scale(1.75);
      z-index: 1;
    }

    &.is-selected &__inner {
      transform: rotateY(180deg);
      box-shadow: 0 0 100vw 100vw rgba(0, 0, 0, 0.7);
    }

    &__inner {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 0.35rem;
    }

    &__front,
    &__back {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    &__front {
      transform: rotateY(180deg);
    }
  }

  .card {
    transition: all 0.5s ease;

    &:not(.disabled):not(.is-selected):hover > .card__inner {
      box-shadow: 0 0 30px 15px rgba(0, 0, 0, 0.5);
    }

    &__inner {
      box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.5);
      transition: transform 0.5s ease-out;
      transform-style: preserve-3d;
    }

    &__front,
    &__back {
      backface-visibility: hidden;
    }

    &__front {
      &--alcoholic {
        background: url($ed-card-alcoholic) center no-repeat;
        background-size: cover;
      }

      &--avalanche {
        background: url($ed-card-avalanche) center no-repeat;
        background-size: cover;
      }

      &--donator {
        background: url($ed-card-donator) center no-repeat;
        background-size: cover;
      }

      &--multiplier {
        background: url($ed-card-multiplier) center no-repeat;
        background-size: cover;
      }

      &--percentile {
        background: url($ed-card-percentile) center no-repeat;
        background-size: cover;
      }

      &--randomiser {
        background: url($ed-card-randomiser) center no-repeat;
        background-size: cover;
      }
    }

    &__back {
      background: url($ed-card-back) center no-repeat;
      background-size: contain;
    }
  }
</style>
