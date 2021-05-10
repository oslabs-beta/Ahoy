import React from 'react';
import { Table } from 'semantic-ui-react';
import LocalChart from './LocalChart';

const path = require('path');

const LocalChartList = (props) => {
  const { localCharts, handleOpenChartClick, getDeployedCharts } = props;
  const lcharts = [];
  localCharts.forEach((item, i) => {
    const dirPath = path.join(props.userChartDir, item.name);
    lcharts.push(<LocalChart
      chart={item}
      id={i}
      // eslint-disable-next-line react/no-array-index-key
      key={i}
      dirPath={dirPath}
      getDeployedCharts={getDeployedCharts}
      handleOpenChartClick={handleOpenChartClick}
    />);
  });
  return (
    <Table fixed singleLine stackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="1">Available Charts</Table.HeaderCell>
          <Table.HeaderCell colSpan="3">Install Name</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{lcharts}</Table.Body>
    </Table>
  );
};

export default LocalChartList;
