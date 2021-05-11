import React, { useState } from 'react';
import {
  Table, Button, Input, Label,
} from 'semantic-ui-react';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

/** Local Chart List Component */
const LocalChart = (props) => {
  const { chart, handleOpenChartClick } = props;
  const [alertInvalidInput, setAlertInvalidInput] = useState('');
  let chartInstName = ''; // chart name to install

  // Custom helm chart name from user input.
  function setName(e) {
    chartInstName = e.target.value;
  }

  // Sanitize chart name. If field is empty, use props.chart.name as default
  function sanitizeInput(text) {
    const name = text.trim();
    if (text === '') {
      return props.chart.name;
    }
    const regex = /^\w+$/;
    if (regex.test(name)) {
      return name;
    }
    return 'invalid input';
  }

  // Install/Deploy the helm chart using user input name
  const installHelmChart = async () => {
    console.log('chartInstName', chartInstName);
    const helmChart = sanitizeInput(chartInstName);
    // if the input is invalid, show the alert on the label
    if (helmChart === 'invalid input') {
      setAlertInvalidInput(<Label pointing="left" color="red">Invalid input</Label>);
    } else {
    // if the input is valid, install the chart
      const directory = props.dirPath;
      setAlertInvalidInput('');
      const { stdout, stderr } = await exec(`helm install ${helmChart} "${directory}"`);
      props.getDeployedCharts();
    }
  };

  // Prepare the Open Chart & Install buttons
  const openChartButton = <Button id="openChartBtn" icon="folder open" size="tiny" compact onClick={() => handleOpenChartClick(chart.name)} />;
  const installButton = <Button id="installBtn" size="tiny" compact onClick={() => installHelmChart()}>Install</Button>;

  // Render the local chart component
  return (
    <Table.Row>
      <Table.Cell>{chart.name}</Table.Cell>
      <Table.Cell colSpan="2">
        <Input
          focus
          placeholder={chart.name}
          onBlur={setName}
          size="mini"
        />
        {alertInvalidInput}
      </Table.Cell>
      <Table.Cell>
        <div className="float-right">
          {installButton}
          {' '}
          {openChartButton}
        </div>
      </Table.Cell>
    </Table.Row>
  );
};

export default LocalChart;
