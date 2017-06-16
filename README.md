# Method Sniffer
> Parses files the given project, and give the predicate function, returns list of methods.

## Usage

### Sniffing
1. Create predicate file
```js
// predicate.js
const predicate = (methodText) => methodText.indexOf('$http');
module.exports = predicate;
```
2. Run `node sniff.js ./path/to/your/project --type=<ts|js> --out=<report-file-name>`
3. See the `reports` folder.

### Analyze
1. Run `node analyze.js --type=<method-names>`
2. See the result in console.

## Limitations
1. Works on typescript files.
2. Supports only modules and classes.

## Licence
[MIT](./LICENCE).
