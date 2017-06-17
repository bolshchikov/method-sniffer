//@ts-check

const fs = require('fs');
const rimraf = require('rimraf');
const REPORT_FOLDER_PATH = require('./consts').REPORT_FOLDER_PATH;

const removeReportFile = (fileName) => {
  return new Promise((resolve, reject) => {
    rimraf(REPORT_FOLDER_PATH + fileName, resolve);
  });
};

const createReportFolder = () => {
  if (!fs.existsSync(REPORT_FOLDER_PATH)) {
    fs.mkdirSync(REPORT_FOLDER_PATH);
  }
}

exports.toFile = (context, fileName) => {
  createReportFolder();
  removeReportFile(fileName).then(() => {
    fs.writeFile(REPORT_FOLDER_PATH + fileName, context.join('\n'));
  });
};
