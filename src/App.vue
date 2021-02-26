<template>
  <main class="l-main main">
    <button
      v-if="!status && component === 'splash'"
      @click="selectComponent('players')"
      class="btn btn-players btn--fixed-left"
    />
    <button
      v-else-if="status"
      @click="closeGameAndGoHome"
      class="btn btn-end btn--fixed-right"
    />
    <transition name="main__component" mode="out-in">
      <component
        :is="component"
        @players-closed="selectComponent('splash')"
        @start="checkPlayersAndStartGame"
      />
    </transition>
    <small class="version">Version 0.0.1</small>
  </main>
</template>

<script>
  import Players from './components/players/Players.vue';
  import Splash from './components/Splash.vue';
  import CardSelection from './components/CardSelection.vue';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data() {
      return {
        component: 'splash',
      };
    },
    computed: {
      ...mapGetters([
        'players',
        'currentPlayer',
        'status',
      ]),
    },
    methods: {
      ...mapActions([
        'startGame',
        'endGame',
        'resetPlayer',
        'deactivateMultiplier',
        'unsetMultiplierToPlayer',
      ]),
      checkPlayersAndStartGame() {
        if (this.players.length > 0) {
          this.startGame();
          this.selectComponent('card-selection');
        } else {
          // @TODO ADD ERROR HANDLING
          alert('You need at least 1 player');
          this.selectComponent('players');
        }
      },
      closeGameAndGoHome() {
        this.endGame();
        this.resetPlayer();
        this.deactivateMultiplier();
        this.selectComponent('splash');
        this.players.forEach(player => {
          this.unsetMultiplierToPlayer(player);
        });
      },
      selectComponent(component) {
        this.component = component;
      },
    },
    components: {
      Splash,
      Players,
      CardSelection,
    },
  };
</script>
<style lang="scss">
  @import "./scss/app";

  .l-main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow: hidden;
  }

  .main {
    background: url($ed-main-background) center no-repeat;
    background-size: cover;

    &__component-enter-active {
      animation: fade-in 0.5s ease both;
    }

    &__component-leave-active {
      animation: fade-out 0.5s ease both;
    }
  }

  .version {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    color: #fff;
    font-weight: 500;
    font-family: sans-serif;
  }
</style>
