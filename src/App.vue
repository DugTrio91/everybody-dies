<template>
  <div>
    <h1>Everybody Dies</h1>
    <h2 v-if="status">Current player: {{ currentPlayer.name }}</h2>
    <div v-if="!status && component === 'splash'">
      <button @click="selectComponent('players')">Players</button>
      <button @click="checkPlayersAndStartGame">Start Game</button>
    </div>
    <button v-else-if="status" @click="closeGameAndGoHome">End Game</button>
    <component
      :is="component"
      @players-closed="selectComponent('splash')"
    />
  </div>
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
      ]),
      created() {
        console.log(this.currentPlayer);
      },
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
        this.selectComponent('splash');
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
