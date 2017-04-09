const test = require('tap').test
const walkup = require('../')
const {dirname} = require('path')

test('that it finds the node_modules folder in the parent successfully', (t) => {
  walkup(__dirname, 'node_modules', (err, {found}) => {
    t.error(err)
    t.equal(found, true)
    t.end()
  })
})

test('that it finds the .git folder in the parent successfully', (t) => {
  walkup('./', '.git', (err, {found}) => {
    t.error(err)
    t.equal(found, true)
    t.end()
  })
})

test('that it returns the path to the folder that contains the path or directory', (t) => {
  walkup(__dirname, 'node_modules', (err, {found, path}) => {
    t.error(err)
    t.equal(found, true)
    t.equal(path, dirname(__dirname))
    t.end()
  })
})

test('that it doesn\'t find a non-existant file or folder', (t) => {
  walkup(__dirname, new Date().toISOString(), (err, {found}) => {
    t.error(err)
    t.equal(found, false)
    t.end()
  })
})
