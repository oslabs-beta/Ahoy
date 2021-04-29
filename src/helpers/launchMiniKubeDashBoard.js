import React from "react";
const util = require("util");
const exec = util.promisify(require("child_process").exec);

// lists the currently deployed helm charts. used in MainContainer as a componentDidMount function
const launchMiniKubeDashBoard = async () => {
  try {
    const { stdout, stderr } = await exec("minikube dashboard");
    
    return stdout;
  } catch (stderr) {
    console.error("stderr:", stderr);
    return stderr;
  }
};

export default launchMiniKubeDashBoard;
