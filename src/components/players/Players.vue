<template>
  <div>
    <player
      v-for="player in players"
      :key="player.id"
      :player="player"
    />
    <div v-if="newPlayerInputVisible">
      <input v-model="newPlayerName" type="text">
      <button @click="addNewPlayer" :disabled="playerExists">Add</button>
    </div>
    <button @click="toggleNewPlayerInput">
      {{ newPlayerInputVisible ? 'Cancel' : 'New Player' }}
    </button>
    <button @click="closePlayers">Close</button>
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
      }
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
          id: require('uniqid').process(),
          name: this.newPlayerName,
          multiplier: false,
        });
        this.toggleNewPlayerInput()
        this.newPlayerName = '';
      },
      closePlayers() {
        this.$emit('players-closed');
      }
    },
    components: {
      Player,
    },
  };
</script>
