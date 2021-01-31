export const dice = {
  methods: {
    roll(max, multiply = false) {
      const roll = this.generate(max);

      if (!multiply) {
        return roll;
      } else {
        return this.multiply(roll);
      }
    },
    multiply(roll) {
      return roll * this.generate(4);
    },
    generate(max) {
      return Math.floor(Math.random() * max) + 1;
    },
  },
};
