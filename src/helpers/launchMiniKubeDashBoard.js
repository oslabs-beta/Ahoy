const util = require("util");
const exec = util.promisify(require("child_process").exec);

// Launch the minikube dashboard
const launchMiniKubeDashBoard = async () => {
  try {
    const { stdout, stderr } = await exec("minikube dashboard");
    return stdout;
  } catch (stderr) {
    return stderr;
  }
};

export default launchMiniKubeDashBoard;
