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

  // uninstall the helm chart. saving STDOUT into object not yet implemented
  const uninstallHelmChart = async () => {
    
    console.log('uninstalling helm chart: ', props.chartItem.name)
    const helmChart = props.chartItem.name;
    const {stdout, stderr} = await exec(`helm uninstall ${helmChart}`)

  }


  // build the installed chart component
  return (
      <div className = 'chart-item-box'>
        <div className = 'chart-item-details'>
        {chartDetails}
        </div>
        <div className = 'chart-button-container'>
          <Button compact onClick={() => uninstallHelmChart()}>Uninstall</Button>
        </div>
      </div>
  )
};

export default InstalledChart;
