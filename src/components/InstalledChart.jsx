import React from 'react';
import {
  Button, Table, Header, Modal, Icon, Accordion, List, Popup,
} from 'semantic-ui-react';
import Version from './Version';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

/** Installed Chart Component */
const InstalledChart = (props) => {
  const {
    chart, history, toggleHistory, doHelmChartRollBack,
  } = props;
  const {
    app_version, chartName, name, namespace, revision, updated,
  } = chart;

  // Build detail dropdown
  const chartDetails = [
    {
      key: 'detailKey',
      title: name,
      content: {
        content: (
          <div className="accordian-chart-details">
            <List>
              <List.Item icon="clone" content={`Namespace: ${namespace}`} />
              <List.Item icon="at" content={`Current App Version: ${app_version}`} />
              <List.Item icon="sort numeric down" content={`Revision: ${revision}`} />
              <List.Item icon="clock outline" content={`Last Updated: ${updated}`} />
            </List>
          </div>
        ),
      },
    },
  ];

  // Uninstall the helm chart. saving STDOUT into object not yet implemented
  const uninstallHelmChart = async () => {
    const helmChart = chart.name;
    await exec(`helm uninstall ${helmChart}`);
    props.getDeployedCharts();
  };

  // Builds history component array
  const versionsArray = [];
  for (let i = 0; i < history.length; i++) {
    versionsArray.push(
      <Version
        key={`key-${i}`}
        details={history[i]}
        release={name}
        doHelmChartRollBack={doHelmChartRollBack}
      />,
    );
  }

  // Render the installed chart component
  // Component features a dropdown detail and two buttons: the uninstall button and history button
  // The uninstall button is a Popup component that renders a confirmation button
  return (
    <Table.Row>
      <Table.Cell className="installed-chart-cell">
        <Table className="borderless">
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Accordion panels={chartDetails} />
              </Table.Cell>
              <Table.Cell>
                <Button
                  id="historyBtn"
                  className="button-right"
                  onClick={() => toggleHistory(name)}
                  size="tiny"
                  compact
                >
                  History
                </Button>
                <Popup
                  trigger={(
                    <Button
                      name="uninstall"
                      id="uninstallBtn"
                      className="button-right"
                      size="tiny"
                      compact
                    >
                      Uninstall
                    </Button>
                  )}
                  content={(
                    <Button
                      id="uninstallBtnConfirm"
                      color="red"
                      content="Confirm Uninstall"
                      onClick={() => {
                        uninstallHelmChart();
                      }}
                    />
                  )}
                  id="confirm"
                  on="click"
                  position="top right"
                />
              </Table.Cell>
            </Table.Row>
            {versionsArray}
          </Table.Body>
        </Table>
      </Table.Cell>
    </Table.Row>
  );
};

export default InstalledChart;
