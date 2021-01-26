const state = {
  gameStarted: false,
  multiplierActive: false,
  cards: [
    'multiplier',
    'avalanche',
    'alcoholic',
    'donator',
    'randomiser',
  ],
};

const mutations = {
  'TOGGLE_GAME'(state, started) {
    state.gameStarted = started;
  },
  'TOGGLE_MULTIPLIER'(state, started) {
    state.gameStarted = started;
  },
};

const actions = {
  startGame: ({ commit }) => {
    commit('TOGGLE_GAME', true);
  },
  endGame: ({ commit }) => {
    commit('TOGGLE_GAME', false);
  },
  activateMultiplier: ({ commit }) => {
    commit('TOGGLE_MULTIPLIER', true);
  },
  deactivateMultiplier: ({ commit }) => {
    commit('TOGGLE_MULTIPLIER', false);
  },
};

const getters = {
  status: state => state.gameStarted,
  cards: state => state.cards,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
