#!/usr/bin/env node
// @ts-check

const argv = require('yargs').argv;
const predicate = require('./predicate');
const parseFile = require('./src/parser').parseFile;
const toFile = require('./src/reporter').toFile;

const filePath =  argv._[0];
toFile(parseFile(filePath, predicate));
