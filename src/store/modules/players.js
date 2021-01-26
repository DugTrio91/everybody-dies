const state = {
  players: [],
  currentPlayer: 0,
};

const mutations = {
  'ADD_PLAYER'(state, { id, name, multiplier }) {
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
    if ((state.currentPlayer + 1) >= state.players.length) {
      state.currentPlayer = 0;
    } else {
      state.currentPlayer++;
    }
  }
};

const actions = {
  addPlayer: ({ commit }, player) => {
    commit('ADD_PLAYER', player);
  },
  deletePlayer: ({ commit }, player) => {
    commit('DELETE_PLAYER', player);
  },
  nextPlayer: ({ commit }) => {
    commit('NEXT_PLAYER')
  }
};

const getters = {
  players: state => state.players,
  currentPlayer: state => state.players[state.currentPlayer],
}

export default {
  state,
  mutations,
  actions,
  getters
}
