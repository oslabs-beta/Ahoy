import React from 'react';
import { Table } from 'semantic-ui-react';
import InstalledChart from './InstalledChart';

// console.log("InstalledChartList.jsx loaded");

const InstalledChartList = (props) => {
  const listData = [];
  const { deployedCharts, getDeployedCharts, toggleHistory } = props;
  for (let i = 0; i < deployedCharts.length; i++) {
    const { history } = deployedCharts[i];
    listData.push(
      <InstalledChart
        key={`chart-${i}`}
        chart={deployedCharts[i]}
        getDeployedCharts={getDeployedCharts}
        toggleHistory={toggleHistory}
        history={history}
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
