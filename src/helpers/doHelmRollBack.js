const util = require('util');
const exec = util.promisify(require('child_process').exec);

const doHelmRollBack = async (release, revision) => {
  console.log(`Rolling Back ${release} to version ${revision}`);
  try {
    const command = `helm rollback ${release} ${revision}`;
    const { stdout, stderr } = await exec(command);
    return stdout;
  } catch (stderr) {
    return stderr;
  }
};

export default doHelmRollBack;
