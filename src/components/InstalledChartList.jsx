import React from 'react';
import {useEffect, useState} from 'react';
import InstalledChart from '../components/InstalledChart';

console.log("InstalledChartList.jsx loaded")

const InstalledChartList = (props) => {
  // Receive an output JS object of command 'helm list -o' as props
  // console.log(`InstalledList: props = ${props}`);

  // indivisual item will be rendered by the child component Installed Chart by passing the element (object)
  let listData = ''

  for(let i = 0; i < chartArray.length; i ++){
        listData += <InstalledChart chartItem = {chartArray[i]}/>
  } 

  console.log(listData);
  
  return (
      <div id="installed-chart-list">
        <div>{listData}</div>
      </div>
  )
};

const chartArray = [
  {
    name: 'my-wordpress',
    namespace: 'default',
    revision: '6',
    updated: '2021-04-22 19:44:30.018909 -0700 PDT',
    status: 'deployed',
    chart: 'wordpress-10.10.3',
    app_version: '5.7.1'
  },
  {
    name: 'my-wordpress-jyjy',
    namespace: 'default',
    revision: '1',
    updated: '2021-04-24 10:33:22.59994 -0700 PDT',
    status: 'deployed',
    chart: 'wordpress-10.10.1',
    app_version: '5.7.0'
  }
]

export default InstalledChartList;
