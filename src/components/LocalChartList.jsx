import React from 'react';
import LocalChart from '../components/LocalChart';
import { Table } from 'semantic-ui-react';

const LocalChartList = (props) => {
  console.log(`LocalChartList: props = ${props}`);
  const lcharts = [];
  props.localCharts.forEach((item, i) => {
    lcharts.push(<LocalChart name={item} id={i} key={i}/>)
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