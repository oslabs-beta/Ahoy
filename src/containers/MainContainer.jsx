import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import FSHelper from '../helpers/FileSystemHelper';
import LocalChartContainer from './LocalChartContainer';
import InstalledChartContainer from './InstalledChartContainer';
import getDeployedHelmCharts from '../helpers/getDeployedHelmCharts';
import getHelmHistory from '../helpers/getHelmHistory';

const path = require('path');

const { ipcRenderer } = window.require('electron');

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataDir: null,
      userChartDir: null,
      localCharts: [],
      deployedCharts: [],
      // islocalChartDeployed: [],
      // localChartsLoopCount: 0,
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
    // this.launchMiniKubeDashBoard = this.launchMiniKubeDashBoard.bind(this);
  }

  // run upon successful rendering of the component
  componentDidMount() {
    // get list of currently deployed helm charts
    this.getHelmCharts();
  }

  // runs every time setState() is invoked
  componentDidUpdate() {
    const { userDataDir, userChartDir, localCharts } = this.state;
    // Use a helper to setState a list of local charts
    if (userDataDir && localCharts.length === 0) {
      FSHelper.getLocalCharts(userChartDir).then((result) => {
        this.setState({
          localCharts: result,
        });
        return result;
      });
    }
  }

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

  toggleHistory(chartName) {
    const { deployedCharts } = this.state;
    // const removedHistoryCharts = this.state.deployedCharts;
    for (let i = 0; i < deployedCharts.length; i++) {
      if (deployedCharts[i].name === chartName) {
        if (deployedCharts[i].historyClicked === true) {
          deployedCharts[i].historyClicked = false;
          deployedCharts[i].history = [];
          this.setState({
            deployedCharts,
          });
        } else {
          deployedCharts[i].historyClicked = true;
          this.setState({
            deployedCharts,
          });
          this.getHistory(chartName);
        }
      }
    }
  }

  // checkDeployedLocalCharts(result) {
  //   const { deployedCharts } = this.state;
  //   const booleansArray = [];
  //   result.forEach((chart) => {
  //     let boolean = false;
  //     for (let i = 0; i < deployedCharts.length; i++) {
  //       if (deployedCharts[i].name === chart) boolean = true;
  //     }
  //     booleansArray.push(boolean);
  //   });
  //   this.setState({ islocalChartDeployed: booleansArray });
  // }

  // launchMiniKubeDashBoard() {
  //   console.log('Launching Minikube Dashboard...');
  //   launchDashBoard().then((x) => console.log('Dashboard Launched:', x));
  // }

  render() {
    const { userChartDir, localCharts, deployedCharts } = this.state;
    return (
      <>
        <Button onClick={() => this.launchMiniKubeDashBoard()}>
          Launch Dashboard
        </Button>

        <LocalChartContainer
          userChartDir={userChartDir}
          localCharts={localCharts}
          getDeployedCharts={this.getHelmCharts}
        />
        <InstalledChartContainer
          deployedCharts={deployedCharts}
          getDeployedCharts={this.getHelmCharts}
          toggleHistory={this.toggleHistory}
        />
        {/* this is for the testing */}
        {/* <Button onClick={() => this.getHistory("yoko-wordpress")}>
          Get Helm History
        </Button> */}
        {/* <InstalledChartList deployedCharts={this.state.deployedCharts}/> */}
      </>
    );
  }
}

export default MainContainer;
