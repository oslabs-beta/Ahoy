const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Fetch Helm chart release history
const getHelmHistory = async (releaseName) => {
  try {
    const command = `helm history ${releaseName} -o json`;
    const { stdout, stderr } = await exec(command);
    console.log(`Getting ${releaseName}'s history...`);
    return stdout;
  } catch (stderr) {
    return stderr;
  }
};

export default getHelmHistory;
