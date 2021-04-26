import React from 'react';
import LocalChart from '../components/LocalChart';

const LocalChartList = (props) => {
  console.log(`LocalChartList: props = ${props}`);
  const lcharts = [];
  props.localCharts.forEach((item, i) => {
    lcharts.push(<LocalChart name={item} id={i} key={i}/>)
  })
  return (
    <table id="local-chart-list">
      <tbody>{lcharts}</tbody>
    </table>
  )
};

export default LocalChartList;