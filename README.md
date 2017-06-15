# Method Sniffer
> Parses files the given project, and give the predicate function, returns list of methods.

## Usage
1. Create predicate file
```js
// predicate.js
const predicate = (methodText) => methodText.indexOf('$http');
module.exports = predicate;
```
2. Run `node index.js ./path/to/your/project --type=<ts|js> --out=<report-file-name>`
3. See the `report` file

## Limitations
1. Works on typescript files
2. Supports modules and classes 

## Licence
[MIT](./LICENCE).
