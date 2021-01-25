import Vue from 'vue';
import Vuex from 'vuex';

import players from './modules/players';
import cards from './modules/cards';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    players,
    cards,
  },
});
