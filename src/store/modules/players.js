const state = {
  players: [
    {
      id: '3h2k34',
      name: 'Mark',
      multiplier: false,
    },
    {
      id: 's8979s',
      name: 'Jamie',
      multiplier: false,
    },
    {
      id: '987sa6',
      name: 'Vicki',
      multiplier: false,
    },
  ],
  currentPlayer: 0,
};

const mutations = {
  'ADD_PLAYER'(state, {
    id,
    name,
    multiplier,
  }) {
    state.players.push({
      id: id,
      name: name,
      multiplier: multiplier,
    });
  },
  'DELETE_PLAYER'(state, { id }) {
    const player = state.players.find(player => player.id === id);

    state.players.splice(state.players.indexOf(player), 1);
  },
  'NEXT_PLAYER'(state) {
    state.currentPlayer++;
  },
  'RESET_PLAYER'(state) {
    state.currentPlayer = 0;
  },
  'SET_MULTIPLIER_TO_PLAYER'(state, { id }) {
    const player = state.players.find(player => player.id === id);

    player.multiplier = true;
  },
  'UNSET_MULTIPLIER_TO_PLAYER'(state, { id }) {
    const player = state.players.find(player => player.id === id);

    player.multiplier = false;
  },
};

const actions = {
  addPlayer: ({ commit }, player) => {
    commit('ADD_PLAYER', player);
  },
  deletePlayer: ({ commit }, player) => {
    commit('DELETE_PLAYER', player);
  },
  nextPlayer: context => {
    if ((context.state.currentPlayer + 1) >= context.state.players.length) {
      context.dispatch('checkMultiplier');
      context.commit('RESET_PLAYER');
    } else {
      context.dispatch('checkMultiplier');
      context.commit('NEXT_PLAYER');
    }
  },
  checkMultiplier: context => {
    if (context.rootState.game.multiplierTurns > 0) {
      context.rootState.game.multiplierTurns = context.rootState.game.multiplierTurns - 1;
    } else {
      const multiplier = context.state.players.find(player => player.multiplier === true);

      if (multiplier) {
        context.commit('UNSET_MULTIPLIER_TO_PLAYER', multiplier);
      }
    }
  },
  resetPlayer: ({ commit }) => {
    commit('RESET_PLAYER');
  },
  setMultiplierToPlayer({ commit }, player) {
    commit('SET_MULTIPLIER_TO_PLAYER', player);
  },
  unsetMultiplierToPlayer({ commit }, player) {
    commit('UNSET_MULTIPLIER_TO_PLAYER', player);
  },
};

const getters = {
  players: state => state.players,
  currentPlayer: state => state.players[state.currentPlayer],
};

export default {
  state,
  mutations,
  actions,
  getters,
};
