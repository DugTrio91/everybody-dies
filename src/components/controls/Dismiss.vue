<template>
  <button
    class="dismiss"
    :class="{ 'disabled' : loading }"
    :loading="loading"
    @click="$emit('click')"
  >
    Dismiss
  </button>
</template>
<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
  };
</script>
<style lang="scss">
  @import "../../scss/app";

  .dismiss {
    height: 6rem;
    width: 13rem;
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
</style>
