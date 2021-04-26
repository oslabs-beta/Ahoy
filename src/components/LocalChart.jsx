import React from 'react';
import { Table, Button, Label } from 'semantic-ui-react';

const LocalChart = (props) => {
  return (
    <Table.Row>
      <Table.Cell>{props.name}</Table.Cell>
      <Table.Cell><Button compact>Install</Button></Table.Cell>
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