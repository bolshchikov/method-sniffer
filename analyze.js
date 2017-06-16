//@ts-check

require('console.table');
const argv = require('yargs').argv;
const methodNamesProcessor = require('./src/processor').methodNames;

switch(argv.type) {
  case 'method-names':
    methodNamesProcessor().then(console.table);
    break;
  default:
    console.log('No type is recognized');
    break;
};
