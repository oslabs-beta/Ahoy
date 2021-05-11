const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Lists the currently deployed helm charts. Used in MainContainer as a componentDidMount function
const getDeployedHelmCharts = async () => {
  try {
    const { stdout } = await exec('helm list -o json');
    return stdout;
  } catch (stderr) {
    return stderr;
  }
};

export default getDeployedHelmCharts;
