<template>
  <div class="splash">
    <h1 class="splash__title">
      <span class="splash__title-top">Everybody</span>
      <span class="splash__title-bottom">Dies</span>
    </h1>
    <button
      class="btn btn-start splash__start"
      @click="$emit('start')">Start Game
    </button>
  </div>
</template>

<style lang="scss">
  @import "../scss/app";

  .splash {
    display: inline-block;
    text-align: center;

    &__title {
      user-select: none;
      color: $ed-title-font-colour;
      text-shadow: 0 0 6rem #000;
      animation-delay: 5s;

      &-top {
        font-size: $ed-title-font-top-size;
        font-family: $ed-title-font-top;
        animation: slide-in-right 1s ease both;
        animation-delay: 1.2s;
        -webkit-text-stroke: 0.15rem #4a3825;

        background: linear-gradient(to bottom, #FCFBB6 33%, #A29869 66%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      &-bottom {
        display: block;
        font-size: $ed-title-font-bottom-size;
        font-family: $ed-title-font-bottom;
        text-transform: uppercase;
        animation: slide-in-top 1.5s ease both;
        animation-delay: 2.7s;
        -webkit-text-stroke: 0.2rem #4a3825;

        background: linear-gradient(to bottom, #FCFBB6 44%, #A29869 55%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    &__start {
      animation: fade-in 1.5s ease both;
      animation-delay: 4.2s;
    }
  }


</style>
