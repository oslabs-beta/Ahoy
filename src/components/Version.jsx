import React from 'react';
import { Table, Button, List } from 'semantic-ui-react';

function Version(props) {
  console.log('props in version:', props);
  const {
    app_version, chart, description, revision, status, updated,
  } = props.details;

  return (
    <Table.Row>
      <Table.Cell>
        <List>
          <List.Item>
            Version: {app_version}
            <List.List>
              <List.Item icon="chart line" content={`Chart: ${chart}`} />
              <List.Item icon="sticky note outline" content={`Description: ${description}`} />
              <List.Item icon="sort numeric down" content={`Revision: ${revision}`} />
              <List.Item icon="star" content={`Status: ${status}`} />
              <List.Item icon="clock outline" content={`Updated: ${updated}`} />
            </List.List>
          </List.Item>
        </List>

      </Table.Cell>
      <Table.Cell>
        <Button
          class="button-right"
          size="tiny"
          compact
          // onClick={() => doHelmRollBack()}
        >
          ERASE YOUR MISTAKE
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default Version;
