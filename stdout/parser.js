// const {exec, spawn} = require('child_process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
//helm list: { command = 'helm list', callback = parseHelm, colNum = 7, commandType = helm}
//helm history: { command = 'helm history _______', callback = parseHelm, colNum = 6,  commandType = helm}
//kubect deployments: { command = 'kubectl get deployments', callback = parseKubeCtl, colNum = 5,  commandType = kubectl}
//kubect svc: { command = 'kubectl get svc', callback = parseKubeCtl, colNum = 6,  commandType = kubectl}

// console.log('OUR TABLE OBJ: ', getTableObj('helm list', 7, 'helm'))
// console.log(getTableObj('helm history my-wordpress', 6, 'helm'))
// console.log(getTableObj('kubectl get deployments', 5, 'kubectl'))
// console.log(getTableObj2('kubectl get svc', 6, 'kubectl'))

// getTableObj('kubectl get svc', 6, 'kubectl').then(result => console.log('IS THIS THE RESULT: ',result))
// example function call
// getTableObj('kubectl get svc', 6, 'kubectl').then(result => console.log('IS THIS THE RESULT: ', result))
getTableObj('minikube status', 6, 'minikube').then(result => console.log('IS THIS THE RESULT: ', result))
async function getTableObj(command, callback, numCols, commandType) {
  let strArr;
  
  try {
    const {stdout, stderr} = await exec(command)
    // parsing logic   
  
    if(commandType === 'helm'){
      // if parsing helm -> use strArr1 
      strArr = stdout.split(/[\t,\n]/).filter( el => el !== '');
    }
    else if(commandType === 'kubectl'){
      // if parsing kubectl -> use strArr2
      strArr = stdout.split(/[\s \n]/).filter( el => el !== '');
    }
    else if(commandType === 'minikube'){
      // if parsing kubectl -> use strArr2
      console.log('Minikube STDOUT: ', stdout)
      strArr = stdout.split(/[\n :]/).filter( el => el !== '');
      strArr = strArr.slice(1);
    }
  
    // callback is always parse()
    const result = callback(strArr, numCols);

    //console.log(result)
    return result;
  }

  catch (stderr) {
    console.error('stderr:', stderr);
    return
  }
  
};

function parseRow(strArr, numCols){

  // make an object
  const obj = {};
  // iterate through the string array - first round becomes keys in the object
    // keeps looping over, passing in as values to obj 
  keyArr = strArr.slice(0, numCols).map( x => x.trim()); 

  const valArr = strArr.slice(numCols).map( x => x.trim());

  // initialize all keys in the object
  for(let i = 0; i < keyArr.length; i ++){
    obj[keyArr[i]] = []
  }

  //initialize counter for value array
  let count = numCols;

  // run through values and pair them with keys
  while(valArr.length) {
    for (let i = 0; i < numCols; i++) {
      obj[keyArr[i]].push(valArr.shift())
    }
  }
// return the object
return obj
}


function parseCol(strArr, numCols) {

}

// exports.getTableObj = getTableObj
module.exports = getTableObj;


// function getTableObj(command, numCols, commandType) {
//   let strArr;
  
//   const temp = exec(command, (err, stdout, stderr) => {
//   // parsing logic

//   if(commandType === 'helm'){
//     // if parsing helm -> use strArr1 
//     strArr = stdout.split(/[\t,\n]/).filter( el => el !== '');
//   }
//   else if(commandType === 'kubectl'){
//     // if parsing kubectl -> use strArr2
//     strArr = stdout.split(/[\s \n]/).filter( el => el !== '');
//   }

//   // callback is always parse()
//   const result = parse(strArr, numCols);
//   return result

// })
//   return temp
// }


