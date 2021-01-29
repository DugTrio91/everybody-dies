<template>
  <div>
    <h1>The Randomiser</h1>
    <p v-if="loading">Please wait while your fate is decided...</p>
    <p v-if="!loading && rule">{{ rule }}</p>
    <p v-if="multiplier">
      If this includes whoever has the multiplier, take {{ multipliedDrinks }} drink(s)!
    </p>
    <button @click="dismiss">Dismiss</button>
  </div>
</template>

<script>
  import { randomiser } from '@/rules';
  import { dice } from '@/mixins/dice';

  export default {
    data() {
      return {
        loading: false,
        rule: null,
        rules: randomiser,
        multiplier: false,
        multipliedDrinks: 0,
      };
    },
    created() {
      this.toggleLoading();
      this.selectRule();
    },
    methods: {
      selectRule() {
        setTimeout(() => {
          const rule = this.rules[dice.methods.roll(this.rules.length)];
          this.rule = rule.instruction;
          this.multiply(rule);
          this.toggleLoading();
        }, 500);
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
        this.multipliedDrinks = dice.methods.roll(4) + 1;
        this.multiplier = true;
      },
    },
    mixins: [dice],
  };
</script>
