const state = {
  players: [],
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
};

const actions = {
  addPlayer: ({ commit }, player) => {
    commit('ADD_PLAYER', player);
  },
  deletePlayer: ({ commit }, player) => {
    commit('DELETE_PLAYER', player);
  },
};

const getters = {
  players: state => state.players,
}

export default {
  state,
  mutations,
  actions,
  getters
}
