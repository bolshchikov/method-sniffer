// @ts-check
const fs = require('fs');
const flatten = require('lodash').flatten;
const readdir = require('recursive-readdir');
const kebabCase = require('lodash').kebabCase;

const REPORTS_PATH = `./reports`;

const calculateOccurrences = (acc, curr) => {
  if (acc[curr] === undefined) {
    acc[curr] = 1;
  } else {
    acc[curr] += 1;
  }
  return acc;
};

const extractFirstMethodWord = (word) => {
  return kebabCase(word).split('-').shift();
};

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    resolve(fs.readFileSync(path).toString());
  });
};

const readFiles = () => {
  return readdir(REPORTS_PATH)
    .then(files => Promise.all(files.map(path => readFile(path))))
    .then(content => content.map(file => file.split('\n')));
};

const methodNamesProcessor = () => readFiles()
  .then((content) => flatten(content)
    .map(extractFirstMethodWord)
    .reduce(calculateOccurrences, {}));

module.exports = {
  methodNames: methodNamesProcessor
};
