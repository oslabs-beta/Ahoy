import React from "react";
const util = require("util");
const exec = util.promisify(require("child_process").exec);

// fetches Helm chart release history
const getHelmHistory = async (releaseName) => {
  try {
    let command = `helm history ${releaseName} -o json`;
    const { stdout, stderr } = await exec(command);
    console.log(`Getting ${releaseName}'s history...`);
    return stdout;
  } catch (stderr) {
    console.error("stderr:", stderr);
    return stderr;
  }
};

export default getHelmHistory;