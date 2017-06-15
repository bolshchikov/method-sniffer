// @ts-check

const fs = require('fs');
const ts = require('typescript');
const curry = require('lodash/curry');
const flatten = require('lodash/flatten');
const readdir = require('recursive-readdir');

const shouldAnalyze = (predicate, sourceFile, kind) => predicate(kind.getText(sourceFile));

const extractRelevantClassMethods = (classDefinition, predicate) => {
  return classDefinition.members
    .filter(member => member.kind === ts.SyntaxKind.MethodDeclaration)
    .filter(member => predicate(member))
    .map(member => member.name.text)
}

const extractRelevantMethods = (fileObject, predicate) => {
  return fileObject.statements.reduce((acc, node) => {
    switch (node.kind) {
      case ts.SyntaxKind.ModuleDeclaration:
        return acc.concat(extractRelevantMethods(node.body, predicate));
      case ts.SyntaxKind.ClassDeclaration:
        return acc.concat(extractRelevantClassMethods(node, predicate));
      default:
        return acc;
    }
  }, []);
};

exports.parseFile = (filePath, predicate) => {
  const fileName = filePath.split('/').pop();
  const sourceFile = ts.createSourceFile(
    fileName,
    fs.readFileSync(filePath).toString(),
    ts.ScriptTarget.ES2016
  );

  const shouldAnalyzeKind = curry(shouldAnalyze)(predicate)(sourceFile);

  return new Promise((resolve, reject) => {
    if (shouldAnalyzeKind(sourceFile)) {
      resolve(extractRelevantMethods(sourceFile, shouldAnalyzeKind));
    } else {
      resolve([]);
    }
  });
};

exports.parseFolder = (path, fileType, predicate) => {
  return readdir(path, [`!*.${fileType}`, `*.spec.${fileType}`, `*.driver.${fileType}`, `*.d.ts`])
    .then(files => {
      const parseFiles = files.map(filePath => this.parseFile(filePath, predicate));
      return Promise.all(parseFiles);
    })
    .then((values) => {
      return flatten(values);
    });
}
