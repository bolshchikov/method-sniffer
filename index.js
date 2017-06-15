#!/usr/bin/env node
// @ts-check

const argv = require('yargs').argv;
const predicate = require('./predicate');
const parseFile = require('./src/parser').parseFile;
const parseFolder = require('./src/parser').parseFolder;
const toFile = require('./src/reporter').toFile;
const utils = require('./src/utils');

const path = argv._[0];
const fileType = argv.type || 'ts';
const outputFileName = argv.out || 'report';

if (utils.isFile(path)) {
  parseFile(path, predicate).then(content => toFile(content, outputFileName));
} else {
  parseFolder(path, fileType, predicate).then(content => toFile(content, outputFileName));
}

