import React from 'react';
import LocalChart from '../components/LocalChart';
import { Table } from 'semantic-ui-react';
const path = require('path');

const LocalChartList = (props) => {
  console.log('LocalChartList:', props);

  // build out the directory to push into LocalChart
  // console.log('userChartDir:', props.userChartDir);
  
  // console.log('LocalCharts:', props.localCharts);

  const lcharts = [];
  props.localCharts.forEach((item, i) => {
    const dirPath = path.join(props.userChartDir, item.name);
    lcharts.push(<LocalChart name={item.name} id={i} key={i} dirPath={dirPath}/>)
  })
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan='2'>Available Charts</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{lcharts}</Table.Body>
    </Table>
  )
};

export default LocalChartList;