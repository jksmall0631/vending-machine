const Snack = require('./snack').default

export default class Machine {
  constructor() {
    this.state = {
      status: 'idle',
      credits: 0,
      change: 0,
      selection: null,
      snacks: {
        a1: [],
        a2: [],
        a3: [],
        a4: [],
        a5: [],
        a6: [],
        a7: [],
        a8: [],
        a9: [],
        a10: []
      }
    }
  }

  acceptCredits(amount) {
    this.state.status = 'credited';
    this.state.credits = amount;
  }

  checkCredits(selection) {
    const snackKeys = Object.keys(this.state.snacks)
    snackKeys.forEach(snack => {
      if(selection == snack){
        if(this.state.credits >= this.state.snacks[snack][0].price){
          this.makeSelection(snack)
        }else{
          alert('Gimme some mo money, fool.')
        }
      }
    })
  }

  makeSelection(snack) {
    this.state.snacks[snack].shift();
    this.state.change = this.state.credits - this.state.snacks[snack][0].price;
    this.state.credits = this.state.credits - this.state.snacks[snack][0].price;
    this.state.selection = snack
  }

  restock(snack, name, price){
    while(this.state.snacks[snack].length < 10){
      this.state.snacks[snack].push(new Snack(name, price))
    }
  }

  restockAll(){
    this.restock('a1','Twix', 75);
    this.restock('a2','Dingdongs', 100);
    this.restock('a3','Reeses', 75);
    this.restock('a4','Doritos', 75);
    this.restock('a5','Gummy Worms', 100);
    this.restock('a6','Hot Tamales', 25);
    this.restock('a7','Choco Taco', 200);
    this.restock('a8','Real Taco', 100);
    this.restock('a9','Whoppers', 75);
    this.restock('a10','Peach Os', 50);
  }

  reset() {
    this.constructor()
  }

}
