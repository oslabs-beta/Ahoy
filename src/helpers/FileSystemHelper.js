const util = require('util');
import fs from 'fs';

const getLocalCharts = function(path) {
  return new Promise(function(resolve, reject) {
    const resultArray = [];
    fs.readdir(path, function(err, result) {
      result.forEach(dir => {
        //console.log(`FileSystemHelper: getLocalCharts: pushing dir = ${dir}`);
        if (dir !== '.DS_Store') resultArray.push(dir);
      });
      resolve(resultArray);
    });
  });
}

export default {
  getLocalCharts: getLocalCharts,
}
