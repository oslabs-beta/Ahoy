import React, { Component } from 'react';
import LocalChartContainer from './LocalChartContainer';
import InstalledChartContainer from './InstalledChartContainer';
import getDeployedHelmCharts from '../helpers/getDeployedHelmCharts';
import getHelmHistory from '../helpers/getHelmHistory';
import doHelmRollBack from '../helpers/doHelmRollBack';

const path = require('path');
const { getLocalCharts } = require('../helpers/FileSystemHelper');

const { ipcRenderer } = window.require('electron');

// state is all contained at the MainContainer level and prop drilled down to various components
class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataDir: null,
      userChartDir: null,
      localCharts: [],
      deployedCharts: [],
    };

    ipcRenderer.invoke('getPath', 'userData').then((result) => {
      this.setState({
        userDataDir: result,
        userChartDir: path.join(result, 'charts'),
      });
    });

    this.getHelmCharts = this.getHelmCharts.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.toggleHistory = this.toggleHistory.bind(this);
    this.doHelmChartRollBack = this.doHelmChartRollBack.bind(this);
  }

  // Get list of running Helm Charts upon app start. Helm charts are independent of the app status
  componentDidMount() {
    this.getHelmCharts();
  }

  componentDidUpdate() {
    const { userDataDir, userChartDir, localCharts } = this.state;
    if (userDataDir && localCharts.length === 0) {
      getLocalCharts(userChartDir).then((result) => {
        this.setState({
          localCharts: result,
        });
        return result;
      });
    }
  }

  // build the installed helm chart list and initialize history to each chart object
  getHelmCharts() {
    getDeployedHelmCharts()
      .then((result) => JSON.parse(result))
      .then((charts) => {
        const deployedCharts = charts;
        for (let i = 0; i < deployedCharts.length; i++) {
          deployedCharts[i].history = [];
          deployedCharts[i].historyClicked = false;
        }
        this.setState({
          deployedCharts,
        });
      });
  }

  // populates history object for each installed helm chart
  getHistory(currentChart) {
    getHelmHistory(currentChart)
      .then((result) => JSON.parse(result))
      .then((versions) => {
        const { deployedCharts } = this.state;
        for (let i = 0; i < deployedCharts.length; i++) {
          if (deployedCharts[i].name === currentChart) {
            const updatedCharts = deployedCharts;
            updatedCharts[i].history = versions;
            this.setState({
              deployedCharts: updatedCharts,
            });
          }
        }
      });
  }

  // toggles the show history button
  toggleHistory(chartName) {
    const { deployedCharts } = this.state;
    for (let i = 0; i < deployedCharts.length; i++) {
      if (deployedCharts[i].name === chartName) {
        if (deployedCharts[i].historyClicked) {
          deployedCharts[i].historyClicked = false;
          deployedCharts[i].history = [];
        } else {
          deployedCharts[i].historyClicked = true;
          this.getHistory(chartName);
        }
        this.setState({
          deployedCharts,
        });
      }
    }
  }

  // rolls back to previous release.
  doHelmChartRollBack(release, version) {
    doHelmRollBack(release, version)
      .then((result) => console.log(result))
      .then(this.getHelmCharts())
      .then('Successfully rolled back!');
  }

  render() {
    const {
      userChartDir, localCharts, deployedCharts,
    } = this.state;
    return (
      <>
        <LocalChartContainer
          userChartDir={userChartDir}
          localCharts={localCharts}
          getDeployedCharts={this.getHelmCharts}
        />
        <InstalledChartContainer
          deployedCharts={deployedCharts}
          getDeployedCharts={this.getHelmCharts}
          toggleHistory={this.toggleHistory}
          doHelmChartRollBack={this.doHelmChartRollBack}
        />
      </>
    );
  }
}

export default MainContainer;
