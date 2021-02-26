<template>
  <div class="l-player player">
    <input
      class="l-player__input player__input"
      type="text"
      v-model="player.name"
      disabled
    >
    <button
      class="l-player__delete player__delete btn"
      @click="deletePlayer(player)"
    />
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    methods: {
      ...mapActions([
        'deletePlayer',
      ]),
    },
    props: ['player'],
  };
</script>

<style lang="scss">
  .l-player {
    display: flex;
    align-items: center;

    &__input {
      margin: 1rem;
      padding: 0.5rem;
    }

    &__delete {
      height: 5rem;
      width: 5rem;
    }
  }

  .player__input {
    background-color: #322821;
    color: #fff;
    outline: 0.5rem groove #7c6856;
  }

  .player__delete {
    background: url('~@/assets/buttons/button-action-delete.png') center no-repeat;
    background-size: contain;

    &:hover {
      background: url('~@/assets/buttons/button-action-delete-hover.png') center no-repeat;
      background-size: contain;
    }
  }
</style>
