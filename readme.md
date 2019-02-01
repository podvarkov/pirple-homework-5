## Homework Assignment #5

This is the third of several homework assignments you'll receive in this course. In order to receive your certificate of completion (at the end of this course) you must complete all the assignments and receive a passing grade.

#### How to Turn It In:

* Create a public github repo for this assignment. 

* Create a new post in the [Facebook Group](https://www.facebook.com/groups/1282717078530848/)  and note "Homework Assignment #3" at the top.

* In that thread, discuss what you have built, and include the link to your Github repo. 

#### The Assignment (Scenario): 

* Create a new empty repository with a /test folder, and an /app folder.
* Inside of the app folder, create a library (lib.js) and fill it with simple functions. These can serve any purpose you wish, such as generating a random number, or checking whether or not a string is a palindrome. Really, any kind of functions will do.
* Inside the /test folder, create a simple test runner, and then write tests for the functions in your lib.js file. You should try to test that they return (or callback) the correct value when passed valid parameters, and that they return a predictable value (and don't crash) when passed invalid parameters.

This is open ended, and can take whatever form you wish.

#### Docs:

* Create test directory in your project root.
* Put files with .spec.js extension in test directory.
* Run tests with ```node teapot``` command.

#### Teapot package usage:

* Import describe, test, expect from teapot utils module
```const {describe, test, expect} = require('../teapot/utils')```

* Write tests
```
module.exports = describe('Example test block',

  test('Should assoc key to object', done => {
    expect(lib.assoc('baz', 'bar', {foo: 'bar'})).deepStrictEqual({foo: 'bar', baz: 'bar'})
    expect(lib.assoc('foo', 1, {foo: 'bar'})).deepStrictEqual({foo: 1})
    done()
  }),

  test('Should return property by name', done => {
    expect(lib.prop('bar', {bar: 'baz', foo: 'bar'})).equal('baz')
    done()
  }))
  
```

#### Expect usage
This is node assert wrapper, that implements all basic methods
of assert package.
Or tou can simply use original assert package.