import React from 'react';
import { Button } from 'semantic-ui-react';

const util = require('util');
const exec = util.promisify(require('child_process').exec);


console.log("InstalledChart.jsx loaded")

const InstalledChart = (props) => {

  const chart = props.chartItem;
  console.log('InstalledChart chart item :', props.chart);

  let chartDetails = [];
  for(let key in chart){
    chartDetails.push(chart[key])
  }

  // console.log('chart details: ', chartDetails)


  const uninstallHelmChart = async () => {
    
    console.log('uninstalling helm chart: ', props.chartItem.name)
    const helmChart = props.chartItem.name;
    const {stdout, stderr} = await exec(`helm uninstall ${helmChart}`)

  }

  return (
      <div className = 'chart-item-box'>
        <div className = 'chart-item-details'>
        {chartDetails}
        </div>
        <div className = 'chart-button-container'>
          <Button onClick={() => uninstallHelmChart()}>Uninstall</Button>
        </div>
      </div>
  )
};

export default InstalledChart;
