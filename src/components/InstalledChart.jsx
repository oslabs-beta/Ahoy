import React from 'react';

import { Button, Table } from 'semantic-ui-react';
import Version from './Version';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const InstalledChart = (props) => {
  const {
    chart, history, toggleHistory, doHelmChartRollBack,
  } = props;
  const {
    app_version, chartName, name, namespace, revision, updated,
  } = chart;
  const chartDetails = [name, namespace, revision, app_version, chartName, updated].join(' ');

  // const [historyClicked, setHistoryClicked] = useState(false);

  // useEffect(() => async () => {
  //   await props.getHistory(chart.name);
  // },
  // [historyClicked]);

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

  // build the installed chart component
  return (
    <Table.Row>
      <Table.Cell className="installed-chart-cell">
        <Table className="borderless">
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {chartDetails}
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
                <Button
                  className="button-right"
                  onClick={() => uninstallHelmChart()}
                  size="tiny"
                  compact
                >
                  Uninstall
                </Button>
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
