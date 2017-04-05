require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert
const Machine = require('../machine').default
const Person = require('../person').default

describe('Machine', function() {
  const newMachine = new Machine()
  const Shua = new Person("Shua", 100)

  afterEach(function() {
    newMachine.reset();
  });

  it('should accept credits', () => {
    assert.equal(newMachine.state.status, 'idle')
    newMachine.acceptCredits(Shua, 100)
    assert.equal(newMachine.state.status, 'credited')
    assert.equal(newMachine.state.credits, 100)
    assert.equal(newMachine.state.change, 0)
  });

  it('should check credits', () => {
    assert.equal(newMachine.state.status, 'idle')
    newMachine.acceptCredits(Shua, 100)
    assert.equal(newMachine.state.status, 'credited')
    assert.equal(newMachine.state.credits, 100)
    newMachine.checkCredits('b4')
  });

  it('should fail if not enough credits', () => {
    assert.equal(newMachine.state.status, 'idle')
    newMachine.acceptCredits(Shua, 50)
    assert.equal(newMachine.state.status, 'credited')
    assert.equal(newMachine.state.credits, 50)
    assert.equal(newMachine.checkCredits('c4'), undefined)
  });

  it('should return change if too many credits are inserted', () => {
    assert.equal(newMachine.state.status, 'idle')
    newMachine.acceptCredits(Shua, 100)
    assert.equal(newMachine.state.status, 'credited')
    assert.equal(newMachine.state.credits, 100)
    newMachine.checkCredits('b4')
    assert.equal(newMachine.state.change, 25)
  });

  it('should return a treat', () => {
    assert.equal(newMachine.state.status, 'idle')
    newMachine.acceptCredits(Shua, 100)
    assert.equal(newMachine.state.status, 'credited')
    assert.equal(newMachine.state.credits, 100)
    newMachine.checkCredits('b4')
    assert.equal(newMachine.state.selection, 'b4')
  });

});

describe('Person', function() {
  const newMachine = new Machine()
  const Shua = new Person("Shua", 100)

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
