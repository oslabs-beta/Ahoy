import yaml from 'yaml';
import fs from 'fs';

const verifyLocalChartDir = (localChartPath) => {
  if (!fs.existsSync(localChartPath)) {
    // console.log(`Local chart dir does not exist. Creating it. ${localChartPath}`);
    return fs.mkdirSync(localChartPath);
  }
  return true;
};

const getLocalCharts = (path) => new Promise((resolve, reject) => {
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

// This is work in progress... to read a Chart.yaml and parse contents.
const getChartYAML = (path, chartName) => new Promise((resolve, reject) => {
  const file = fs.readFileSync(`${path}/${chartName}/Chart.yaml`, 'utf8');
  resolve(yaml.parse(file));
});

export {
  verifyLocalChartDir,
  getLocalCharts,
};
