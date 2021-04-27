
const getTableObj = require('./parser.js')

let helmchart = 'my-wordpress'
getTableObj(`helm history ${helmchart}`, 6, 'helm').then(result => console.log('IS THIS THE RESULT: ',result))