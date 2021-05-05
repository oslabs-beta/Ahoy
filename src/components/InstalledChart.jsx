import React, { useState, useEffect } from 'react';

import {
  Button, Table,
} from 'semantic-ui-react';
import Version from './Version';
// import { Table } from 'semantic-ui-react';
// import {Dropdown} from 'semantic-ui-react';
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// console.log("InstalledChart.jsx loaded");

const InstalledChart = (props) => {
  // console.log("props at InstalledChart: ", props);

  const { chart } = props;
  const { currentChartHistory } = props;

  // for (let key in chart) {
  //   chartDetails.push(chart[key] + " ");
  // }

  const {
    appVersion, chartName, name, namespace, revision, updated,
  } = chart;
  const chartDetails = [name, namespace, revision, appVersion, chartName, updated].join(' ');

  const [historyClicked, setHistoryClicked] = useState(false);

  useEffect(() => async () => {
    await props.getHistory(chart.name);
  },
  [historyClicked]);

  // uninstall the helm chart. saving STDOUT into object not yet implemented
  const uninstallHelmChart = async () => {
    const helmChart = chart.name;
    const { stdout, stderr } = await exec(`helm uninstall ${helmChart}`);
    props.getDeployedCharts();
  };

  const versionsArray = [];
  for (let i = 0; i < currentChartHistory.length; i++) {
    versionsArray.push(<Version
      revision={currentChartHistory[i].revision}
      name={currentChartHistory[i].chart}
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
                  onClick={() => { setHistoryClicked(true); }}
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
