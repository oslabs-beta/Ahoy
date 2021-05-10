import React, { useState } from 'react';
import {
  Table, Button, Input, Label,
} from 'semantic-ui-react';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const LocalChart = (props) => {
  const { chart, handleOpenChartClick } = props;

  const [alertInvalidInput, setAlertInvalidInput] = useState('');
  const [inputError, setAlertInvalidInnput] = useState('');

  // install helm chart. providing k8s secrets not yet attempted
  let chartInstName = ''; // chart name to install. default value is

  function setName(e) {
    // console.log(e.target.value);

    chartInstName = e.target.value;
  }

  function sanitizeInput(text) {
  // if field is empty, set props.chart.name
    const name = text.trim();
    if (text === '') {
      return props.chart.name;
    }
    const regex = /^\w+$/;
    if (regex.test(name)) {
      return name;
    }
    // Label.value = 'invalid input';
    return 'invalid input';
  }

  const installHelmChart = async () => {
    // const helmChart = props.chart.name;
    // console.log('chartInstName:', chartInstName);
    const helmChart = sanitizeInput(chartInstName);
    // console.log('helmChart:', helmChart);
    // if the input is invalid, show the alert on the label
    if (helmChart === 'invalid input') {
      setAlertInvalidInput(<Label pointing="left">Invalid input</Label>);
      // showAlert.push(<MessageLabel content="Invalid Input" />);
      // console.log(showAlert);
      // console.log('invalid input boo');
    } else {
    // if the input is valid, install the chart
      const directory = props.dirPath;
      // console.log(`installing helm chart ${helmChart} at ${directory}`);
      setAlertInvalidInput('');
      const { stdout, stderr } = await exec(`helm install ${helmChart} ${directory}`);
      props.getDeployedCharts();
    }
  };

  // Prepare the Open Chart button
  const openChartButton = <Button icon="folder open" size="tiny" compact onClick={() => handleOpenChartClick(chart.name)} />;

  // Prepare the Install button
  let installButton;
  const disabled = false;
  if (disabled) {
    installButton = <Button disabled size="tiny" compact onClick={() => installHelmChart()}>Install</Button>;
  } else {
    installButton = <Button size="tiny" compact onClick={() => installHelmChart()}>Install</Button>;
  }

  // build the local chart component
  return (
    <Table.Row>
      <Table.Cell>{chart.name}</Table.Cell>
      <Table.Cell>
        <Input
          focus
          placeholder={chart.name}
          onChange={setName}
          size="mini"
          color="red"
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
