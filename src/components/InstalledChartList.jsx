import React from 'react';
import { Table } from 'semantic-ui-react';
import InstalledChart from '../components/InstalledChart';

console.log("InstalledChartList.jsx loaded")

const InstalledChartList = (props) => {

let listData = [];
for(let i = 0; i < props.deployedCharts.length; i ++){
  listData.push(<InstalledChart key={`chart-${i}`} chartItem = {props.deployedCharts[i] }/>)
} 
  
  return (
    <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan='2'>Installed Charts</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>{listData}</Table.Body>
  </Table>
  )
};
export default InstalledChartList;
