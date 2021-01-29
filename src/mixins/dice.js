export const dice = {
  methods: {
    roll(max) {
      return Math.floor(Math.random() * max)
    }
  }
}
