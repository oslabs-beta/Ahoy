import React from 'react';

console.log("InstalledChart.jsx loaded")

const InstalledChart = (props) => {

  const chart = props.chartItem;
  console.log('InstalledChart chart item :', props.chart);

  let chartDetails = '';
  for(let key in chart){
    chartDetails += `<div class="chart-item">${chart[key]}</div>`
  }

  console.log(chartDetails)

  return (
      <div className = 'chart-item-box'>
        <div className = 'chart-item-details'>
        {chartDetails}
        </div>
        <div className = 'chart-button-container'>
        {/* <Button id={}>Uninstall</Button> */}
        </div>
      </div>
  )
};

export default InstalledChart;
