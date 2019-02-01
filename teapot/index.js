const fs = require('fs')
const path = require('path')

const tests = fs.readdirSync(process.cwd() + '/test').filter(name => name.indexOf('.spec.js') > -1)

tests.forEach(test => {
  require('./' + path.relative(__dirname, process.cwd() + '/test/' + test)).run()
})