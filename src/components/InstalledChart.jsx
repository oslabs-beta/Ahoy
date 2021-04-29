import React from "react";
import { Button, Table, Dropdown, Menu } from "semantic-ui-react";
import Version from './Version';
// import { Table } from 'semantic-ui-react';
// import {Dropdown} from 'semantic-ui-react';
const util = require("util");
const exec = util.promisify(require("child_process").exec);

console.log("InstalledChart.jsx loaded");

const InstalledChart = (props) => {
  console.log(`Line 11: props at ${props.chartItem.name} InstalledChart: ${JSON.stringify(props)}`);

  const chart = props.chartItem;

  const chartDetails = [];
  const optionToRollBack = [
    {
      key: "rollback1",
      text: "rollback1",
      value: "rollback1",
    },
    {
      key: "rollback2",
      text: "rollback2",
      value: "rollback2",
    },
  ];

  for (let key in chart) {
    chartDetails.push(chart[key] + " ");
  }

  // uninstall the helm chart. saving STDOUT into object not yet implemented
  const uninstallHelmChart = async () => {
    console.log("uninstalling helm chart: ", chart.name);
    const helmChart = chart.name;
    const { stdout, stderr } = await exec(`helm uninstall ${helmChart}`);

    console.log("component successfully uninstalled");
    // update the charts
    props.getDeployedCharts();
  };

  console.log(`Installed Chart History on ${chart.name}: ${JSON.stringify(chart.history)}`);

  const showHistory = (chartName) => {
    // Declare empty array
    const historyArray = []
    // for loop looking at chart.history
    for (let i = 0; i < chart.history.length; i++){
      // For each element, push <Version name={chart.name}/> into the array
      historyArray.push(<Version name={chart.name}/>);
    }
  };



  // build the installed chart component
  return (
    <Table.Row>
      <Table.Cell className="installed-chart-cell">
        <Table className="borderless">
          <Table.Body>
            <Table.Row>
            <Table.Cell>
          {chartDetails}
            </Table.Cell>
            <Table.Cell>
              {/* <Button
                    className="button-right"
                    onClick={async () => {
                      await props.getHistory(chart.name);
                      showHistory(chart.name);
                    }
              >History
              </Button> */}
              <Button
                    className="button-right"
                    onClick={() => uninstallHelmChart()}
              >Uninstall
              </Button>
            </Table.Cell>
            </Table.Row>
              {/* {historyArray} */}
          </Table.Body>
        </Table>
      </Table.Cell>
    </Table.Row>

    // {/* <Menu className="dropdown-list">
    //   <Menu.Menu position="right">

    //     <Dropdown
    //       item
    //       simple
    //       text="Rollback"
    //       direction="right"
    //       options={optionToRollBack}
    //     />
    //   </Menu.Menu>
    // </Menu> */}
    // {/* {chartDetails}
    // <Menu.Menu position = 'right'>
    //   <Dropdown
    //     placeholder = 'action'
    //     fluid
    //     selection
    //     className = "dropdown-list"
    //     options={OptionToRollBack}
    //   />
    // </Menu.Menu> */}

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
  );
};

export default InstalledChart;
