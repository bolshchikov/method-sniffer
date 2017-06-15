const predicate = (methodText) => methodText.indexOf('$http') > -1;
module.exports = predicate;