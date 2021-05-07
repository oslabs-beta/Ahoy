import React from 'react';
import {
  Button, Table, Header, Modal, Icon, Accordion, List, Popup,
} from 'semantic-ui-react';
import Version from './Version';
// import ConfirmationModal from './ConfirmationModal';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const InstalledChart = (props) => {
  const {
    chart, history, toggleHistory, doHelmChartRollBack,
  } = props;
  const {
    app_version, chartName, name, namespace, revision, updated,
  } = chart;

  // const chartDetails = [name, namespace, revision, app_version, chartName, updated].join(' ');
  const chartDetails = [
    {
      key: 'detailKey',
      title: name,
      content: {
        content: (
          <div>
            <List>
              <List.Item content={`Namespace: ${namespace}`} />
              <List.Item content={`Revision: ${revision}`} />
              <List.Item content={`Current App Version: ${app_version}`} />
              <List.Item content={`Last Updated: ${updated}`} />
            </List>
          </div>
        ),
      },
    },
  ];

  // uninstall the helm chart. saving STDOUT into object not yet implemented
  const uninstallHelmChart = async () => {
    const helmChart = chart.name;
    await exec(`helm uninstall ${helmChart}`);
    props.getDeployedCharts();
  };

  const versionsArray = [];
  for (let i = 0; i < history.length; i++) {
    versionsArray.push(<Version
      key={`key-${i}`}
      details={history[i]}
      release={name}
      doHelmChartRollBack={doHelmChartRollBack}
    />);
  }

  // React hook for uninstall confirmation modal
  const [open, setOpen] = React.useState(false);
  // build the installed chart component
  return (
    <Table.Row>
      <Table.Cell>
        <Table className="borderless">
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {/* <Header size="small">
                  {name}
                </Header> */}

                <Accordion panels={chartDetails} />

              </Table.Cell>
              <Table.Cell>
                <Button
                  className="button-right"
                  onClick={() => toggleHistory(name)}
                  size="tiny"
                  compact
                >
                  History
                </Button>
                {/* <Button
                  className="button-right"
                  onClick={() => uninstallHelmChart()}
                  size="tiny"
                  compact
                >
                  Uninstall
                </Button> */}

                {/* <Modal
                  closeIcon
                  open={open}
                  trigger={(
                    <Button
                      className="button-right"
                      size="tiny"
                      compact
                    >
                      Uninstall
                    </Button>
                  )}
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                >
                  <Header icon="archive" content="Uninstall Helm Chart?" />
                  <Modal.Content>
                    <p>
                      {`Uninstall ${name}? This will spin down all associated k8s clusters.`}
                    </p>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button color="red" onClick={() => setOpen(false)}>
                      <Icon name="remove" />
                      No
                    </Button>
                    <Button
                      color="green"
                      onClick={() => {
                        uninstallHelmChart();
                        setOpen(false);
                      }}
                    >
                      <Icon name="checkmark" />
                      Yes
                    </Button>
                  </Modal.Actions>
                </Modal> */}

                <Popup
                  trigger={(
                    <Button
                      className="button-right"
                      size="tiny"
                      compact
                    >
                      Uninstall
                    </Button>
                  )}

                  content={(
                    <Button
                      color="red"
                      content="srsly?"
                      onClick={() => {
                        uninstallHelmChart();
                      }}
                    />
                  )}
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
