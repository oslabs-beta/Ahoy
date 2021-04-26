
function jsonToTable (arr) {
  let table ='<table>';
  let tableHeader = '';
  let tableBody = '';

  function createTableHeader(){
    tableHeader = '<th><tr>';
    for(let key in arr[0]){
      tableHeader += `<td>${key}</td>`
    }
    tableHeader += '</tr></th>';
    return tableHeader;
  }

  function createTableBody(){
    tableBody = '<tbody>'; 
    for(let i = 0; i < arr.length; i ++){
        tableBody += '<tr>';
        for(let key in arr[i]){
          tableBody += `<td>${arr[i][key]}</td>`
        }
        tableBody += '</tr>';
    }
    tableBody += '</tbody>';
    return tableBody;
  }

  createTableHeader();
  createTableBody();
  
  table += tableHeader + tableBody + '</table>'
  console.log(table);  

}

const historyArray = [
  {
    revision: 1,
    updated: '2021-04-22T17:20:18.424967-07:00',
    status: 'superseded',
    chart: 'wordpress-10.10.1',
    app_version: '5.7.0',
    description: 'Install complete'
  },
  {
    revision: 2,
    updated: '2021-04-22T19:29:13.963988-07:00',
    status: 'superseded',
    chart: 'wordpress-10.10.3',
    app_version: '5.7.1',
    description: 'Upgrade complete'
  },
  {
    revision: 3,
    updated: '2021-04-22T19:39:58.325477-07:00',
    status: 'superseded',
    chart: 'wordpress-10.10.7',
    app_version: '5.7.1',
    description: 'Upgrade complete'
  },
  {
    revision: 4,
    updated: '2021-04-22T19:40:50.430858-07:00',
    status: 'superseded',
    chart: 'wordpress-10.10.8',
    app_version: '5.7.1',
    description: 'Upgrade complete'
  },
  {
    revision: 5,
    updated: '2021-04-22T19:43:23.186163-07:00',
    status: 'superseded',
    chart: 'wordpress-10.10.7',
    app_version: '5.7.1',
    description: 'Rollback to 3'
  },
  {
    revision: 6,
    updated: '2021-04-22T19:44:30.018909-07:00',
    status: 'deployed',
    chart: 'wordpress-10.10.3',
    app_version: '5.7.1',
    description: 'Rollback to 2'
  }
]

jsonToTable(historyArray);