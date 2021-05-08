import yaml from 'yaml';
import fs from 'fs';

const path = require('path');

const getLocalCharts = function (path) {
  return new Promise((resolve, reject) => {
    // Verify charts folder
    verifyLocalChartDir(path);
    // read local charts folder, push to an array and return
    const resultArray = [];
    fs.readdir(path, (err, result) => {
      if (err) {
        console.error(`FileSystemHelper.js: ${err}`);
      } else {
        result.forEach((dir) => {
          if (dir !== '.DS_Store') {
            resultArray.push({ name: dir, version: 'yaml.version.placeholder' });
          }
        });
        resolve(resultArray);
      }
    });
  });
};

const verifyLocalChartDir = function (localChartPath) {
  // console.log(`getLocalCharts: verifyLocalChartDir: checking ${localChartPath}`);
  if (!fs.existsSync(localChartPath)) {
    console.log(`Local chart dir does not exist. Creating it. ${localChartPath}`);
    fs.mkdirSync(localChartPath);
  }
};

// This is work in progress.
const getChartYAML = function (path, chartName) {
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(`${path}/${chartName}/Chart.yaml`, 'utf8');
    resolve(yaml.parse(file));
  });
};

export default {
  getLocalCharts,
};
