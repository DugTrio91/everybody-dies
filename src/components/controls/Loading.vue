<template>
  <div class="loading">
    <img
      class="loading__image"
      src="../../assets/loading.gif"
      alt=""
    >
    <p class="loading__text">
      {{ player }}, please wait while your fate is decided...</p>
  </div>
</template>

<script>
  export default {
    props: {
      player: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style lang="scss">
  .loading__image {
    height: 5rem;
    margin-bottom: 1rem;
  }
</style>
