# Method Sniffer
> Parses files the given project, and give the predicate function, returns list of methods.

## Usage
1. Create predicate file
```js
// predicate.js
const predicate = (methodText) => methodText.indexOf('$http');
module.exports = predicate;
```
2. Run `node index.js ./path/to/your/project --type=ts`
3. See the `report` file

## Licence
[MIT](./LICENCE).
