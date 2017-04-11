require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert
const Machine = require('../machine').default
const Person = require('../person').default
const Snack = require('../snack').default

describe('Machine', function() {
  const newMachine = new Machine()
  const Shua = new Person()
  const snack = new Snack('twix', 400)

  afterEach(function() {
    newMachine.reset();
  });

  it('should restock an empty machine', () => {
    assert.equal(newMachine.state.snacks['a1'].length, 0)
    assert.equal(newMachine.state.snacks['a10'].length, 0)
    newMachine.restockAll()
    assert.equal(newMachine.state.snacks['a1'].length, 10)
    assert.equal(newMachine.state.snacks['a10'].length, 10)
  })

  it('should accept credits', () => {
    newMachine.restockAll()
    assert.equal(newMachine.state.status, 'idle')
    newMachine.acceptCredits(100)
    assert.equal(newMachine.state.status, 'credited')
    assert.equal(newMachine.state.credits, 100)
    assert.equal(newMachine.state.change, 0)
  });

  it('should return "unavailable" if the snack doesn\'t exist', () => {
    newMachine.restockAll()
    assert.equal(newMachine.state.status, 'idle')
    newMachine.acceptCredits(100)
    assert.equal(newMachine.state.status, 'credited')
    assert.equal(newMachine.state.credits, 100)
    newMachine.findSnack('z5')
    assert.equal(newMachine.state.status, 'unavailable')
  })

  it('should check credits', () => {
    newMachine.restockAll()
    assert.equal(newMachine.state.status, 'idle')
    newMachine.acceptCredits(100)
    assert.equal(newMachine.state.status, 'credited')
    assert.equal(newMachine.state.credits, 100)
    newMachine.findSnack('a4')
  });

  it('should return "Insert more $$$" if not enough $$$', () => {
    newMachine.restockAll()
    assert.equal(newMachine.state.status, 'idle')
    newMachine.acceptCredits(25)
    assert.equal(newMachine.state.status, 'credited')
    assert.equal(newMachine.state.credits, 25)
    newMachine.findSnack('a4')
    assert.equal(newMachine.state.status, 'Insert more $$$')
  })

  it('should return change if too many credits are inserted', () => {
    newMachine.restockAll()
    assert.equal(newMachine.state.status, 'idle')
    newMachine.acceptCredits(100)
    assert.equal(newMachine.state.status, 'credited')
    assert.equal(newMachine.state.credits, 100)
    newMachine.findSnack('a4')
    assert.equal(newMachine.returnChange(), 25)
  });

  it('should return a treat', () => {
    newMachine.restockAll()
    assert.equal(newMachine.state.status, 'idle')
    newMachine.acceptCredits(100)
    assert.equal(newMachine.state.status, 'credited')
    assert.equal(newMachine.state.credits, 100)
    newMachine.findSnack('a4')
    assert.equal(newMachine.dispenseSnack(), 'Doritos')
  });

  it('should return return two treats if credit is sufficient', () => {
    newMachine.restockAll()
    assert.equal(newMachine.state.status, 'idle')
    newMachine.acceptCredits(200)
    assert.equal(newMachine.state.status, 'credited')
    assert.equal(newMachine.state.credits, 200)
    newMachine.findSnack('a4')
    assert.equal(newMachine.dispenseSnack(), 'Doritos')
    newMachine.findSnack('a4')
    assert.equal(newMachine.dispenseSnack(), 'Doritos')
    assert.equal(newMachine.state.change, 50)
  });

  it('should remove one treat from the section', () => {
    newMachine.restockAll()
    assert.equal(newMachine.state.status, 'idle')
    newMachine.acceptCredits(100)
    assert.equal(newMachine.state.status, 'credited')
    assert.equal(newMachine.state.credits, 100)
    assert.equal(newMachine.state.snacks['a4'].length, 10)
    newMachine.findSnack('a4')
    assert.equal(newMachine.state.snacks['a4'].length, 9)
  });

  it('should restock a section of the machine', () => {
    assert.equal(newMachine.state.status, 'idle')
    assert.equal(newMachine.state.snacks.a4.length, 0)
    newMachine.restock('a4', 'twix', 75);
    assert.equal(newMachine.state.snacks.a4.length, 10)
  });

});

describe('Person', function() {
  const newMachine = new Machine()
  const Shua = new Person()

  afterEach(function() {
    Shua.reset();
  });

  it('should select and insert credits', () => {
    assert.equal(Shua.state.credits, 500)
    Shua.insertCredit(100)
    assert.equal(Shua.state.credits, 400)
  });

  it('should select an item to purchase', () => {

  })

});
