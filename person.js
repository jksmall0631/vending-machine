export default class Person {
  constructor() {
    this.state = {
      credits: 500,
    }
  }

  insertCredit(amount) {
    this.state.credits -= amount;
  }

  reset() {
    this.constructor()
  }
}
