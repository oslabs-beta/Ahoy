queueMicrotas// This is to use nodejs-helm package someone wrote. Not wroking correctly just yet.
let helmBinary = '/usr/local/bin/helm';
let Promise = require("bluebird");
const Helm = require("nodejs-helm").Helm;
let helm = Promise.promisifyAll(new Helm({helmCommand: helmBinary}));

async function getHistory(){
  let options = {
    releaseName: 'my-wordpress',
    namespace: 'dev' // optional
  }

  let history = await helm.historyAsync(options);
  return history;
}

async function getList(){
  let options = {
    //allNamespaces: true, // optional
    max: 10,
    offset: 20
}; 

  let releases = await helm.listAsync(options);
  console.log(releases)
  return releases;
}

getList()
.then(res => {
  console.log(res);
})

