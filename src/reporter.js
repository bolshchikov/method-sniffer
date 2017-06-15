//@ts-check
const fs = require('fs');
const rimraf = require('rimraf');

const REPORT_FOLDER_NAME = 'report';
const REPORT_FOLDER_PATH = `./${REPORT_FOLDER_NAME}`;

const removeReportFolder = () => {
  return new Promise((resolve, reject) => {
    rimraf(REPORT_FOLDER_PATH, resolve);
  });
};

exports.toFile = (context) => {
  removeReportFolder().then(() => {
    fs.writeFile(REPORT_FOLDER_PATH, context.join('\n'));
  });
};
