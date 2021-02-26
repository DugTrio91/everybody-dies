<template>
  <div>
    <h1>The Avalanche</h1>
    <loading :player="currentPlayer.name" v-if="loading"/>
    <p v-if="!loading">The avalanche has hit {{ hits }} {{ hits > 1 ? 'times' : 'time' }}!</p>
    <ul>
      <li v-for="(player, index) in playersAndDrinks" :key="index">
        {{ player.player.name }},
        <span v-if="player.player.multiplier">you have the multiplier, so</span>
        you must take {{ player.drinks | readableDrinks }}!
      </li>
    </ul>
    <dismiss :loading="loading" @click="dismiss">Dismiss</dismiss>
  </div>
</template>

<script>
  import { dice } from '@/mixins/dice';
  import { mapGetters } from 'vuex';
  import Dismiss from '@/components/controls/Dismiss';
  import Loading from '@/components/controls/Loading';

  export default {
    data() {
      return {
        loading: true,
        hits: 0,
        playersAndDrinks: [],
      };
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
        'players',
      ]),
    },
    created() {
      setTimeout(() => {
        this.hits = dice.methods.roll(6);
        this.startAvalanche();
        this.toggleLoading();
      }, this.loadingTimer());
    },
    methods: {
      startAvalanche() {
        const playerPos = this.players.indexOf(this.currentPlayer);
        const reorderedPlayers = this.reorderPlayers(playerPos);
        let drinks = 1;

        reorderedPlayers.forEach(player => {
          let exists = this.playersAndDrinks.find(el => (el.player.name === player.name));

          if (exists) {
            exists.drinks += drinks;
          } else {
            this.playersAndDrinks.push({
              player: player,
              drinks: drinks,
            });
          }
          drinks++;
        });
        this.checkForMultiplier();
      },
      reorderPlayers(playerPos) {
        const playersAfter = this.players.slice(playerPos, (playerPos + this.hits));
        const remainingHits = this.hits - playersAfter.length;
        let playersPrevious = [];

        do {
          this.players.slice(0, (remainingHits - playersPrevious.length))
            .forEach(el => {
              playersPrevious.push(el);
            });
        }
        while (playersPrevious.length < remainingHits);

        return [...playersAfter, ...playersPrevious];
      },
      checkForMultiplier() {
        this.playersAndDrinks.find(el => {
          if (el.player.multiplier === true) {
            el.drinks = dice.methods.multiply(el.drinks);
          }
        });
      },
      dismiss() {
        this.$emit('dismissed');
      },
      toggleLoading() {
        this.loading = !this.loading;
      },
    },
    components: {
      Dismiss,
      Loading,
    },
  };
</script>
