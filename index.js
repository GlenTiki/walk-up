const fs = require('fs')
const path = require('path')
const trace = require('stack-trace')

const isRoot = (currentPath) => path.resolve(currentPath, '../') === currentPath
const moveUpPath = (currentPath) => path.dirname(path.resolve(currentPath))

function checkPath (currentPath, pathToFind, done) {
  fs.stat(currentPath, (err, stat) => {
    if (err) return done(err)
    if (stat.isDirectory()) {
      fs.readdir(currentPath, (err, files) => {
        if (err) return done(err)

        fs.exists(path.join(currentPath, pathToFind), (exists) => {
          exists ? done(null, {found: true, path: currentPath}) : done(null, {found: false})
        })
      })
    } else {
      done(null, {found: false})
    }
  })
}

function recursePath (currentPath, pathToFind, done) {
  checkPath(currentPath, pathToFind, (err, res) => {
    if (err) return done(err)
    if (res.found || isRoot(currentPath)) {
      done(null, res)
    } else {
      process.nextTick(() => {
        recursePath(moveUpPath(currentPath), pathToFind, done)
      })
    }
  })
}

module.exports = (currentPath, pathToFind, done) => {
  if (!path.isAbsolute(currentPath)) {
    currentPath = path.resolve(trace.get()[0].getFileName(), currentPath)
  }

  recursePath(currentPath, pathToFind, done)
}
