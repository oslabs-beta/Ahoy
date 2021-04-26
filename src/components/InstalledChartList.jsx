import React from 'react';
import InstalledChart from '../components/InstalledChart';
import JsonToTable from '../helpers/JsonToTable';

getTableObj();

const InstalledChartList = (props) => {
  console.log(`InstalledList: props = ${props}`);
  // const chartArray = [];

  const table = JsonToTable(chartArray);
  console.log(table);

  return (
    <table id="installed-chart-list">
      <tbody>{lcharts}</tbody>
    </table>
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