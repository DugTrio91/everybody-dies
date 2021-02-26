import Vue from 'vue';
import App from './App.vue';
import store from './store/store';

Vue.config.productionTip = false;

Vue.mixin({
  data: () => ({
    loadingTimer() {
      return 4000;
    },
  }),
});

Vue.filter(
  'readableDrinks',
  drinks => drinks > 1 ? `${drinks} drinks` : `${drinks} drink`,
);

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
