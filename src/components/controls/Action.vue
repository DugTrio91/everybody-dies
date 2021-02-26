<template>
  <button
    class="action"
    :class="{ 'disabled' : disable }"
    :loading="disable"
    @click="!disable ? $emit('click') : false"
  >
    <slot/>
  </button>
</template>
<script>
  export default {
    props: {
      disable: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
  };
</script>
<style lang="scss">
  @import "../../scss/app";

  .action {
    height: 5rem;
    width: 5rem;
    background: url('~@/assets/buttons/button-action.png') center no-repeat;
    background-size: contain;
    outline: none;
    border: 0;
    font-family: $ed-body-font;
    font-size: 4rem;
    color: #fff;

    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(.disabled):hover {
      background: url('~@/assets/buttons/button-action-hover.png') center no-repeat;
      background-size: contain;
    }
  }
</style>
