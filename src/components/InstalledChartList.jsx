import React from 'react';
import InstalledChart from '../components/InstalledChart';


getTableObj();

const InstalledChartList = (props) => {
  console.log(`VersionList: props = ${props}`);
  const lcharts = [];
  props.localCharts.forEach((item, i) => {
    lcharts.push(<Version name={item} id={i} key={i}/>)
  })
  return (
    <table id="local-chart-list">
      <tbody>{lcharts}</tbody>
    </table>
  )
};

export default InstalledChartList;