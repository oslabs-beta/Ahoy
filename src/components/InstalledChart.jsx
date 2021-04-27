import React from 'react';
import {Button} from 'semantic-ui-react';
console.log("InstalledChart.jsx loaded")

const InstalledChart = (props) => {

  const chart = props.chartItem;
  console.log('InstalledChart chart item :', props.chart);

  let chartDetails = [];
  for(let key in chart){
    chartDetails.push(`<div class="chart-item">${chart[key]}</div>`);
  }

  console.log(chartDetails)

  return (
      <div className = 'chart-item-box ui fluid selection dropdown'>
      <i class="dropdown icon"></i>
        <div className = 'chart-item-details text'>
        {chartDetails}
        </div>
        <div className = 'chart-button-container'>
        {/* <Button id={}>Uninstall</Button> */}
        </div>
      </div>
  )
};

export default InstalledChart;
