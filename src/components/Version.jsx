import React from 'react';
import { Table, Button, List } from 'semantic-ui-react';

function Version(props) {
  // destructure properties
  const {
    app_version, chart, description, revision, status, updated,
  } = props.details;

  const { release, doHelmChartRollBack } = props;

  return (
    <Table.Row>
      <Table.Cell>
        <List>
          <List.Item>
            <strong>Version:</strong>
            {' '}
            {app_version}
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
          className="button-right"
          size="tiny"
          compact
          onClick={() => doHelmChartRollBack(release, revision)}
        >
          ROLLBACK
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default Version;
