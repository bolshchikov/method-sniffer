// @ts-check

const ts = require('typescript');
const fs = require('fs');
const curry = require('lodash/curry');

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

  if (shouldAnalyzeKind(sourceFile)) {
    return extractRelevantMethods(sourceFile, shouldAnalyzeKind);
  } else {
    console.log('File does not meet the predicate function');
  }
};
