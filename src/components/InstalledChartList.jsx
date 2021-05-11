import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import InstalledChart from './InstalledChart';

/** Installed Chart List Component */
const InstalledChartList = (props) => {
  const listData = [];
  const {
    deployedCharts, getDeployedCharts, toggleHistory, doHelmChartRollBack, launchMiniKubeDashBoard,
  } = props;
  // Build the installed chart component array
  for (let i = 0; i < deployedCharts.length; i++) {
    const { history } = deployedCharts[i];
    listData.push(
      <InstalledChart
        key={`chart-${i}`}
        chart={deployedCharts[i]}
        getDeployedCharts={getDeployedCharts}
        toggleHistory={toggleHistory}
        doHelmChartRollBack={doHelmChartRollBack}
        history={history}
      />,
    );
  }
  // Render the local chart list component
  return (
    <Table id="installed-charts">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="2">
            Installed Charts
            <Button
              compact
              size="tiny"
              id="launchDashBoard"
              onClick={() => launchMiniKubeDashBoard()}
            >
              <Icon name="dashboard" />
              {' '}
              Launch Dashboard
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{listData}</Table.Body>
    </Table>
  );
};
export default InstalledChartList;
