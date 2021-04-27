import React from 'react';
import {Button, Table, Dropdown, Menu} from 'semantic-ui-react';
// import { Table } from 'semantic-ui-react';
// import {Dropdown} from 'semantic-ui-react';
import '../css/dropdown.css';
const util = require('util');
const exec = util.promisify(require('child_process').exec);


console.log("InstalledChart.jsx loaded")

const InstalledChart = (props) => {

  console.log('props at InstalledChart: ', props)

  const chart = props.chartItem;
  console.log('InstalledChart chart item :', props.chart);

  const chartDetails = [];
  const optionToRollBack = [
    {
      key: 'rollback1',
      text: 'rollback1',
      value: 'rollback1',
    },
    {
      key: 'rollback2',
      text: 'rollback2',
      value:'rollback2',
    }
  ];

  for(let key in chart){
    chartDetails.push(chart[key] + ' ')
  }

  // uninstall the helm chart. saving STDOUT into object not yet implemented
  const uninstallHelmChart = async () => {
    
    console.log('uninstalling helm chart: ', props.chartItem.name)
    const helmChart = props.chartItem.name;
    const {stdout, stderr} = await exec(`helm uninstall ${helmChart}`)

    console.log('component successfully uninstalled')
    // update the charts
    props.getDeployedCharts();

  }


  // build the installed chart component
  return (
    <Table.Row>
        <Table.Cell>
        <Menu className = "dropdown-list">
          {chartDetails}
          <Menu.Menu position='right'>
            <Button className='button-right' onClick={() => uninstallHelmChart()}>Uninstall</Button>
            <Dropdown
              item
              simple
              text='Rollback'
              direction='right'
              options={optionToRollBack}
            />
          </Menu.Menu>
        </Menu>
        {/* {chartDetails}
        <Menu.Menu position = 'right'>
          <Dropdown
            placeholder = 'action'
            fluid
            selection
            className = "dropdown-list"
            options={OptionToRollBack}
          />
        </Menu.Menu> */}
        </Table.Cell>
    </Table.Row>
      // plain semantic (not react.semantic-ui) way of writing the dropdown list out
      // <div className = 'chart-item-box ui fluid selection dropdown'>
      // <i class="dropdown icon">aaa</i>
      //   <div className = 'chart-item-details text'>
      //   {chartDetails}
      //   </div>
      //   <div className = 'chart-button-container'>
      //     <Button onClick={() => uninstallHelmChart()}>Uninstall</Button>
      //   </div>
      // </div>
  )
};

export default InstalledChart;
