<template>
  <div>
    <h1>The Randomiser</h1>
    <loading :player="currentPlayer.name" v-if="loading"/>
    <p v-if="!loading && rule">
      {{ ruleAffectsPlayerOnly }}
      {{ ruleAffectsPlayerOnly ? rule.instruction.toLowerCase() : rule.instruction }}</p>
    <p v-if="multiplier">
      If this affects whoever has the multiplier, take {{ multipliedDrinks | readableDrinks }}!
    </p>
    <donator-form
      :drinks="3"
      @dismissed="dismiss"
      v-if="donator"
    />
    <dismiss
      v-if="!donator"
      @click="dismiss"
      :loading="loading"
    >
      Dismiss
    </dismiss>
  </div>
</template>

<script>
  import { randomiser } from '@/rules';
  import { dice } from '@/mixins/dice';
  import DonatorForm from '../form/DonatorForm.vue';
  import { mapGetters } from 'vuex';
  import Dismiss from '@/components/controls/Dismiss';
  import Loading from '@/components/controls/Loading';

  export default {
    data() {
      return {
        loading: false,
        rule: null,
        rules: randomiser,
        multiplier: false,
        multipliedDrinks: 0,
        donator: false,
      };
    },
    created() {
      this.toggleLoading();
      this.selectRule();
    },
    computed: {
      ...mapGetters([
        'currentPlayer',
      ]),
      ruleAffectsPlayerOnly() {
        return this.rule.affects === 'player' ? `${this.currentPlayer.name},` : null;
      },
    },
    methods: {
      selectRule() {
        setTimeout(() => {
          this.rule = this.rules[dice.methods.roll(this.rules.length) - 1];
          this.donatable(this.rule);
          this.multiply(this.rule);
          this.toggleLoading();
        }, this.loadingTimer());
      },
      toggleLoading() {
        this.loading = !this.loading;
      },
      dismiss() {
        this.$emit('dismissed');
      },
      multiply(rule) {
        if (!rule.multipliable) {
          return false;
        }

        if ((rule.multipliable && this.currentPlayer.multiplier) && rule.affects === 'player') {
          rule.instruction = rule.instruction.replace(/[0-9]/g, dice.methods.multiply(rule.drinks));
        } else {
          this.multipliedDrinks = dice.methods.multiply(rule.drinks);
          this.multiplier = true;
        }
      },
      donatable(rule) {
        if (!rule.donatable) {
          return false;
        }
        this.donator = true;
      },
    },
    mixins: [dice],
    components: {
      DonatorForm,
      Dismiss,
      Loading,
    },
  };
</script>
