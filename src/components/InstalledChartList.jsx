import React from 'react';
import { Item, Table } from 'semantic-ui-react';
import InstalledChart from './InstalledChart';

// console.log("InstalledChartList.jsx loaded");

const InstalledChartList = (props) => {
  // let listData = [];
  // for(let i = 0; i < props.deployedCharts.length; i ++){
  //   listData.push(<InstalledChart key={`chart-${i}`} chartItem = {props.deployedCharts[i] }/>)
  // }

  // Receive an output JS object of command 'helm list -o' as props
  // console.log(`InstalledList: props = ${props}`);
  // console.log("charts at InstalledChartList: ", props.deployedCharts);
  // individual item will be rendered by the
  // child component Installed Chart by passing the element (object)
  const listData = [];
  // console.log("props at InstalledChartList: ", props);

  for (let i = 0; i < props.deployedCharts.length; i++) {
    listData.push(
      <InstalledChart
        key={`chart-${i}`}
        chart={props.deployedCharts[i]}
        getDeployedCharts={props.getDeployedCharts}
        getHistory={props.getHistory}
        currentChartHistory={props.currentChartHistory}
      />,
    );
  }
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="2">Installed Charts</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{listData}</Table.Body>
    </Table>
  );
};
export default InstalledChartList;
