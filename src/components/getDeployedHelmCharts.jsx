import React from 'react';
const util = require('util');
const exec = util.promisify(require('child_process').exec);


// lists the currently deployed helm charts. used in MainContainer as a componentDidMount function
const getDeployedHelmCharts  = async () => {

  try {
    const {stdout, stderr} = await exec('helm list -o json')
    console.log('Getting list of deployed helm charts...')
    console.log('STDOUT: ', stdout)
    return stdout;
  }
  catch (stderr) {
    console.error('stderr:', stderr);
    return stderr
  }

};

export default getDeployedHelmCharts;