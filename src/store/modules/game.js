const state = {
  gameStarted: false,
  multiplierTurns: 0,
  cards: [
    'multiplier',
    'avalanche',
    'alcoholic',
    'donator',
    'randomiser',
    'percentile',
  ],
};

const mutations = {
  'TOGGLE_GAME'(state, started) {
    state.gameStarted = started;
  },
  'TOGGLE_MULTIPLIER'(state, turns) {
    state.multiplierTurns = turns;
  },
};

const actions = {
  startGame: ({ commit }) => {
    commit('TOGGLE_GAME', true);
  },
  endGame: ({ commit }) => {
    commit('TOGGLE_GAME', false);
  },
  activateMultiplier: ({ commit }, turns ) => {
    commit('TOGGLE_MULTIPLIER', turns);
  },
  deactivateMultiplier: ({ commit }) => {
    commit('TOGGLE_MULTIPLIER', 0);
  },
};

const getters = {
  status: state => state.gameStarted,
  cards: state => state.cards,
  multiplierActive: state => state.multiplierTurns > 0,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
