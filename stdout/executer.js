const util = require('util');
const exec = util.promisify(require('child_process').exec);

// getTableObj('kubectl get deployments -o json').then(result => console.log('KUBECTL GET DEPLOYMENT: ',result))
// getTableObj('kubectl get svc -o json').then(result => console.log('KUBECTL GET SERVICE: ', result))
// getTableObj('helm list -o json').then(result => console.log('HELM LIST: ', result))
// getTableObj('helm history my-wordpress -o json').then(result => console.log('HELM HISTORY: ', result))

getTableObj('helm list -o json').then(result => {

  // console.log(JSON.parse(result))
  const resultObj = JSON.parse(result)
  console.log(resultObj)
  // console.log(resultObj[0])
  // const { revision } = JSON.parse(result)
  // console.log(revision)
  return resultObj
});

async function getTableObj(command) {
  try {
    const {stdout, stderr} = await exec(command)
    return stdout;
  }
  catch (stderr) {
    console.error('stderr:', stderr);
    return
  }
};
// exports.getTableObj = getTableObj
module.exports = getTableObj;



