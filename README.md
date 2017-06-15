# Method Sniffer
> Parses files the given project, and give the predicate function, returns list of methods.

## Usage
1. Create predicate file
```js
// predicate.js
export const predicate = (methodText) => methodText.indexOf('$http');
```
2. Run `sniff ./path/to/your/project`
3. See the `result` file

## Licence
[MIT](./LICENCE).
