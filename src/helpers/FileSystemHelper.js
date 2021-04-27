import yaml from 'yaml'
import fs from 'fs';
import path from 'path';

const getLocalCharts = function(path) {
  return new Promise(function(resolve, reject) {
    // Verify charts folder exists. If not, create it.
    console.log(path);
    const resultArray = [];
    fs.readdir(path, function(err, result) {
      result.forEach(dir => {
        //console.log(`FileSystemHelper: getLocalCharts: pushing dir = ${dir}`);
        if (dir !== '.DS_Store') {
          // const yaml = getChartYAML(path, dir);
          resultArray.push({ name: dir, version: 'yaml.version.placeholder' });
        }
      });
      resolve(resultArray);
    });
  });
}

const verifyLocalChartDir = function(path) {
  // fs.existsSync()
}

const getChartYAML = function(path, chartName) {
  return new Promise(function(resolve, reject) {
    const file = fs.readFileSync(path + '/' + chartName + '/Chart.yaml', 'utf8');
    resolve(yaml.parse(file));
  });
}

export default {
  getLocalCharts: getLocalCharts
}
