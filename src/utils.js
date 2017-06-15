const isFile = (path) => isJSFile(path) || isTSFile(path);
const isJSFile = path => path.endsWith('.js');
const isTSFile = path => path.endsWith('.ts');

module.exports = {
  isFile,
  isJSFile,
  isTSFile
};
