let snacks = {
  a1: {quantity: 12, price: 75},
  a2: {quantity: 16, price: 75},
  a3: {quantity: 1, price: 75},
  a4: {quantity: 15, price: 75},
  a5: {quantity: 11, price: 75},
  a6: {quantity: 15, price: 75},
  a7: {quantity: 6, price: 75},
  a8: {quantity: 7, price: 75},
  a9: {quantity: 9, price: 75},
  a10: {quantity: 12, price: 75},
  b1: {quantity: 2, price: 75},
  b2: {quantity: 2, price: 75},
  b3: {quantity: 7, price: 75},
  b4: {quantity: 8, price: 75},
  b5: {quantity: 2, price: 75},
  b6: {quantity: 13, price: 75},
  b7: {quantity: 13, price: 75},
  b8: {quantity: 16, price: 75},
  b9: {quantity: 5, price: 75},
  b10: {quantity: 10, price: 75}
}

export default class Machine {
  constructor(snacks) {
    this.state = { status: 'idle', credits: 0, change: 0, selection: null }
  }

  acceptCredits(owner, amount) {
    this.state.status = 'credited';
    this.state.credits = amount;
  }

  checkCredits(selection) {
    const snackKeys = Object.keys(snacks)
    snackKeys.forEach(snack => {
      if(selection == snack){
        if(this.state.credits >= snacks[snack].price){
          this.makeSelection(snack)
        }else{
          alert('Gimme some mo money, fool.')
        }
      }
    })
  }

  makeSelection(snack) {
    snacks[snack].quantity--;
    this.state.change = this.state.credits - snacks[snack].price;
    this.state.selection = snack
    // this.returnChange();
  }

  // dispenseSnack(snack) {
  //   this.state.selection = snack
  //   console.log(snack)
  //   return this.state.selection
  // }
  //
  // returnChange() {
  //   console.log(this.state.change)
  //   return this.state.change
  // }

  reset() {
    this.constructor()
  }

}
