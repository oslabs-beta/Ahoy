import React from 'react';
import {
  Table, Button, List, Icon,
} from 'semantic-ui-react';

function Version(props) {
  // destructure properties
  const {
    app_version, chart, description, revision, status, updated,
  } = props.details;

  const { release, doHelmChartRollBack } = props;

  return (
    <Table.Row className="installed-chart-detail">
      <Table.Cell>
        <List>
          <List.Item>
            <div className="installed-chart-detail">
              <strong>Version:</strong>
              {app_version}
              {status === 'deployed' ? <i> current</i>
                : (
                  <Icon
                    name="undo"
                    link
                    size="small"
                    color="orange"
                    onClick={() => doHelmChartRollBack(release, revision)}
                  />
                )}
              <List.List>
                <List.Item icon="chart line" content={`Chart: ${chart}`} />
                <List.Item icon="sticky note outline" content={`Description: ${description}`} />
                <List.Item icon="sort numeric down" content={`Revision: ${revision}`} />
                <List.Item icon="star" content={`Status: ${status}`} />
                <List.Item icon="clock outline" content={`Updated: ${updated}`} />
              </List.List>
            </div>
          </List.Item>
        </List>
      </Table.Cell>
    </Table.Row>
  );
}

export default Version;
