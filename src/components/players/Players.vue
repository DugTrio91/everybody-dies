<template>
  <div class="l-players players">
    <h1>Edit Players</h1>
    <player
      v-for="player in players"
      :key="player.id"
      :player="player"
    />
    <hr
      class="l-players__divide players__divide"
      v-if="newPlayerInputVisible && players.length > 0"
    >
    <div class="l-players__new players__new" v-if="newPlayerInputVisible">
      <input
        class="l-players__new-input players__new-input"
        v-model="newPlayerName"
        type="text"
      >
      <button
        class="l-players__new-button players__new-button btn"
        @click="addNewPlayer"
        :disabled="playerExists"
      />
    </div>
    <hr class="l-players__divide players__divide">
    <button class="l-players__action players__action" @click="toggleNewPlayerInput">
      {{ newPlayerInputVisible ? 'Cancel' : 'New Player' }}
    </button>
    <button
      class="btn btn--fixed-right btn-end"
      @click="closePlayers"
    />
  </div>
</template>

<script>
  import Player from './Player.vue';
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        newPlayerInputVisible: false,
        newPlayerName: '',
      };
    },
    computed: {
      ...mapGetters([
        'players',
      ]),
      playerExists() {
        return this.players.some(player => player.name === this.newPlayerName);
      },
    },
    created() {
      if (this.players.length === 0) {
        this.toggleNewPlayerInput();
      }
    },
    methods: {
      toggleNewPlayerInput() {
        this.newPlayerInputVisible = !this.newPlayerInputVisible;
      },
      addNewPlayer() {
        this.$store.dispatch('addPlayer', {
          id: require('uniqid')
            .process(),
          name: this.newPlayerName,
          multiplier: false,
        });
        this.toggleNewPlayerInput();
        this.newPlayerName = '';
      },
      closePlayers() {
        this.$emit('players-closed');
      },
    },
    components: {
      Player,
    },
  };
</script>

<style lang="scss">
  @import "../../scss/app";

  .players {
    &__divide {
      border-color: #b38242;
    }

    &__new-input {
      background-color: #3b3219;
      color: #c5924a;
      outline: 0.5rem groove #b38242;
    }

    &__new-button {
      background: url('~@/assets/buttons/button-action-add.png') center no-repeat;
      background-size: contain;

      &:hover {
        background: url('~@/assets/buttons/button-action-add-hover.png') center no-repeat;
        background-size: contain;
      }
    }

    &__action {
      height: 6rem;
      width: 13rem;
      background: url('~@/assets/buttons/button-dismiss.png') center no-repeat;
      background-size: contain;
      outline: none;
      border: 0;
      font-family: $ed-body-font;
      font-size: 1.5rem;
      color: #fff;

      &:hover {
        background: url('~@/assets/buttons/button-dismiss-hover.png') center no-repeat;
        background-size: contain;
      }
    }
  }

  .l-players {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__divide {
      width: 100%;
    }

    &__new {
      display: flex;
      align-items: center;

      &-input {
        margin: 1rem;
        padding: 0.5rem;
      }

      &-button {
        height: 5rem;
        width: 5rem;
      }
    }
  }
</style>
