import React from 'react';
import LocalChart from '../components/LocalChart';
import { Table } from 'semantic-ui-react';

const LocalChartList = (props) => {
  console.log('LocalChartList:', props);

  // build out the directory to push into LocalChart
  // console.log('userChartDir:', props.userChartDir);
  
  // console.log('LocalCharts:', props.localCharts);

  const lcharts = [];
  props.localCharts.forEach((item, i) => {
    // console.log('LocalChartDir FullPath: ', props.userChartDir+'\\'+item);
    const dirPath = props.userChartDir + '\\' + item;
    lcharts.push(<LocalChart
                    name={item}
                    id={i}
                    key={i}
                    dirPath={dirPath}
                    getDeployedCharts={props.getDeployedCharts}
                  />)
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