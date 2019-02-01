const {format} = require('util')
const assert = require('assert')

const test = function (testName, fn) {
  return function (done) {
    try {
      fn(() => {
        done(null, format(testName))
      }, (e) => done(true, format('%s\n%s', testName, e)))
    } catch (e) {
      done(true, format('%s\n%s', testName, e))
    }
  }
}

const describe = function (blockName, ...fns) {
  const passed = []
  const failed = []

  return {run: () => _run(fns)}

  function produceReport() {
    console.log('===== %s =====', blockName)
    console.log('\x1b[35mΩ total tests  - %s\x1b[0m', (passed.length + failed.length))
    console.log('\x1b[32m√ passed tests - %s\x1b[0m', passed.length)
    console.log('\x1b[31mx failed tests - %s\x1b[0m', failed.length)
    console.log('-'.repeat(12 + blockName.length))

    passed.forEach(t => console.log('\x1b[32m%s %s\x1b[0m', '√', t))

    if (failed.length) console.log('-'.repeat(12 + blockName.length))
    failed.forEach(t => console.log('\x1b[31m%s %s\x1b[0m', 'x', t))

    console.log('='.repeat(12 + blockName.length))
  }

  function _run([current, ...rest]) {
    current((err, description) => {
      //save test results
      if (!err) {
        passed.push(description)
      } else {
        failed.push(description)
      }

      //run next test
      if (rest.length) {
        _run(rest)
      } else {
        produceReport()
      }
    })
  }
}

const expect = function (actual) {
  return Object.entries(assert).map(([key, val]) => {
      if (typeof val === 'function') {
        return [key, val.bind(assert, actual)]
      } else {
        return false
      }
    })
    .filter(a => a)
    .reduce((acc, el) => {
      acc[el[0]] = el[1]
      return acc
    }, {})
}


module.exports = {test, describe, expect}