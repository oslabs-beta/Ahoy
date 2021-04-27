import React from 'react';
import { Table, Button, Label } from 'semantic-ui-react';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

// build the local chart component
const LocalChart = (props) => {
  console.log('props in LocalChart: ', props)

  // install helm chart. providing k8s secrets not yet attempted
  const installHelmChart = async () => {
    
    const helmChart = props.name;
    const directory = props.dirPath;
    console.log(`installing helm chart ${helmChart} at ${directory}`);
    const {stdout, stderr} = await exec(`helm install ${helmChart} ${directory}` );
    props.getDeployedCharts();
  }

  let button;
  const disabled = false;
  if (disabled === true) {
    button = <Button disabled compact onClick={() => installHelmChart()}>Install</Button>;
  }
  else {
    button = <Button compact onClick={() => installHelmChart()}>Install</Button>;
  }
  // build the local chart component
  return (
    <Table.Row>
      <Table.Cell>{props.name}</Table.Cell>
      {/* <Table.Cell><Button compact onClick={() => installHelmChart()}>Install</Button></Table.Cell> */}
      <Table.Cell>{button}</Table.Cell>
    </Table.Row>
  )
};

export default LocalChart;


/* 

      <Table.Row>
        <Table.Cell>
          <Label ribbon>First</Label>
        </Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>

  <tr><td>{props.name}</td><td><button>install</button></td></tr>

*/