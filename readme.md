# Walk-up

a module to walk upwards in a directory structure to find the first path that contains a file or folder, similar to how `require('dependency')' finds the node_modules folder in parent paths.

## Usage:

given a file structure like so:
```
$ tree -L 2
.
├── index.js
├── node_modules
├── package.json
├── readme.md
└── test
    └── test.js

```

and you run the following in test.js:

```js
const walkup = require('walk-up')
walkup(__dirname, 'node_modules', (err, result) => {
  result.found === true
  // the path would be absolute, just showing relative for example sake
  result.path == '../' // the parent folder path which holds the node_modules
})
```

## API:

```
walkup(startPath, toFind, callback)
```

- `startPath`: a string representing the path at which to start the search. Can be either an absolute or relative path, however, an absolute path is preferred for performance reasons.
- `toFind`: a string which is the sub-path to find. For example. If you wanted to find the 'node\_modules' folder, you would supply that string, but if you wanted the 'node\_modules' that contained the dependency 'express' you would supply the string 'node_modules/express'.
- `callback`: a callback to be called when the path has been found, or when the root directory 'e.g. `/` on *nix-like OSes' has been searched, and nothing was found. Takes two params, an `error`, and the `result`.

The callback takes two parameters.
- `error`: an error, if there was any encountered
- `result`: an object with two properties, `found`, a boolean which will be true if the sub-path was found, and `path` a string which is the path it was found at.

## License

[MIT](./LICENSE)