import React from 'react';
import { Table } from 'semantic-ui-react';

function Version(props) {
  const { revision, name } = props;
  return (
    <Table.Row>
      <Table.Cell colSpan="2">
        {revision}
        {name}
      </Table.Cell>
    </Table.Row>
  );
}

export default Version;
