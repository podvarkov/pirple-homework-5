const {test, describe, expect} = require('../teapot/utils')
const lib = require('../app/lib')

const asyncFn = (arg) => new Promise((res, rej) => {
  setTimeout(() => {
    if (!arg) {
      rej(new Error('Async calling error'))
    } else {
      res(arg)
    }
  }, 2000)
})

module.exports = describe('Functions passed tests',

  test('Should assoc key to object', done => {
    expect(lib.assoc('baz', 'bar', {foo: 'bar'})).deepStrictEqual({foo: 'bar', baz: 'bar'})
    expect(lib.assoc('foo', 1, {foo: 'bar'})).deepStrictEqual({foo: 1})
    done()
  }),

  test('Should return property by name', done => {
    expect(lib.prop('bar', {bar: 'baz', foo: 'bar'})).equal('baz')
    done()
  }),

  test('Should merge two objects', done => {
    const obj = {foo: 'bar'}
    expect(lib.merge(obj, {bar: 'baz'})).deepStrictEqual({foo: 'bar', bar: 'baz'})
    expect(lib.merge(obj, {bar: 'baz', foo: 'foo'})).deepStrictEqual({foo: 'foo', bar: 'baz'})
    expect(lib.merge(obj, undefined)).deepStrictEqual(obj)
    done()
  }),

  test('Should revert value of function', done => {
    const fn = () => true
    const complementedFn = lib.complement(fn)
    expect(complementedFn()).equal(false)
    expect(complementedFn()).notEqual(fn())
    done()
  }),

  test('Should return first value of given list', done => {
    const list = [1, 2, 3, 4, 5]
    expect(lib.first(list)).equal(1)
    done()
  }),

  test('Should return only listed properties', done => {
    const obj = {foo: 'bar', bar: 'baz', a: 1, b: 2, test: 'test'}
    expect(lib.pick(['foo', 'bar'], obj)).deepStrictEqual({foo: 'bar', bar: 'baz'})
    expect(() => lib.pick('foo', obj)).throws(TypeError)
    done()
  }),

  test('Should remove property by name', done => {
    const obj = {foo: 'bar', bar: 'baz'}
    expect(lib.dissoc('foo', obj)).deepStrictEqual({bar: 'baz'})
    expect(lib.dissoc('bar', obj)).deepStrictEqual({foo: 'bar'})
    done()
  }),

  test('Should filter list by given predicate', (done) => {
    const list = [1, 2, 3, 1, 4, 5, 1, 1, 1, 33]
    expect(lib.filter((val) => val === 1, list)).deepStrictEqual([1, 1, 1, 1, 1])
    done()
  }),

  test('Should remove values from list by given predicate', done => {
    const list = [1, 2, 3, 1, 4, 5, 1, 1, 1, 33]
    expect(lib.remove((val) => val === 1, list)).deepStrictEqual([2, 3, 4, 5, 33])
    done()
  }),

  test('Should return true if both arguments are equals', done => {
    expect(lib.equal((2 + 1), 3)).ok()
    done()
  }),

  test('Should return true if object property equals passed argument', done => {
    const object = {a: 1, b: 23}
    expect(lib.propEq('a', 1, object)).ok()
    expect(lib.propEq('b', 23, object)).ok()
    done()
  }),

  test('Should curry given function', done => {
    const fn = (a, b, c) => a + b + c

    const curried = lib.curry(fn)
    expect(typeof curried).equal('function')

    const oneArg = lib.curry(fn)(1)
    expect(typeof oneArg).equal('function')

    const twoArg = lib.curry(fn)(1)(2)
    expect(typeof twoArg).equal('function')

    const result = lib.curry(fn)(1)(2)(3)
    expect(typeof result).notEqual('function')
    expect(typeof result).equal('number')
    expect(result).equal(6)

    done()
  }),

  test('asyncFn should throw an error', (done, fail) => {
    expect(asyncFn())
      .rejects(Error)
      .then(done)
      .catch(fail)
  }),

  test('asyncFn should not throw an error', (done, fail) => {
    expect(asyncFn(5))
      .doesNotReject(Error)
      .then(done)
      .catch(fail)
  }))
