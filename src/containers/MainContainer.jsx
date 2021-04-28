import React, { Component } from 'react';
const path = require('path');
const { ipcRenderer } = window.require('electron');
import FSHelper from '../helpers/FileSystemHelper';
import LocalChartContainer from './LocalChartContainer';
import InstalledChartContainer from './InstalledChartContainer';
import InstalledChartList from '../components/InstalledChartList';
import getDeployedHelmCharts from '../helpers/getDeployedHelmCharts';
// import getHelmHistory from '../helpers/getHelmHistory';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataDir: null,
      userChartDir: null,
      localCharts: [],
      islocalChartDeployed: [],
      deployedCharts: [],
      localChartsLoopCount: 0,
      // STDOUT data object(s) here?
    };

    ipcRenderer.invoke('getPath', 'userData').then(result => {
      this.setState({ userDataDir: result, userChartDir: path.join(result, 'charts') });
    });

    this.getHelmCharts = this.getHelmCharts.bind(this);
  }

  checkDeployedLocalCharts(result) {
    console.log('in checkDeployedLocalCharts');
    let booleansArray = [];
    result.forEach((chart) => {
      let boolean = false;
      for (let i = 0; i < this.state.deployedCharts.length; i++) {
        console.log(`Deployed chart name is ${this.state.deployedCharts[i].name}`);
        console.log(`Local chart name is ${chart}`);
        if (this.state.deployedCharts[i].name === chart) boolean = true;
      }
      booleansArray.push(boolean);
    })
    this.setState({ islocalChartDeployed: booleansArray });
  }


  getHelmCharts() {
    getDeployedHelmCharts()
      .then((result) => JSON.parse(result))
      .then((charts) => {
        // console.log(`Deployed charts array looks like this: ${charts}`);
        this.setState({
          deployedCharts: charts
        });
      });
  }


  // deployedCharts: [{ name: 'kube-prometheus-stack', current: charts[0], revision: [revision1, revision2, revision3, etc]}

  // [{“revision”:1,“updated”:“2021-04-27T21:23:29.859747-07:00”,“status”:“superseded”,“chart”:“wordpress-10.10.1”,“app_version”:“5.7.0”,“description”:“Install complete”},
  // {“revision”:2,“updated”:“2021-04-27T21:30:36.948924-07:00",“status”:“superseded”,“chart”:“wordpress-10.10.3",“app_version”:“5.7.1",“description”:“Upgrade complete”},
  // {“revision”:3,“updated”:“2021-04-27T21:52:02.555729-07:00”,“status”:“superseded”,“chart”:“wordpress-10.10.8”,“app_version”:“5.7.1”,“description”:“Upgrade complete”},
  // {“revision”:4,“updated”:“2021-04-27T21:59:23.424204-07:00",“status”:“deployed”,“chart”:“wordpress-10.10.8",“app_version”:“5.7.1",“description”:“Upgrade complete”}]


  // gets the current chart's history and populates the chart's history
  getHistory(currentChart) {
    getHelmHistory(currentChart)
      .then((result) => JSON.parse(result))
      .then((versions) => {
        for (let i = 0; i < this.state.deployedCharts.length; i++) {
          let newDeployedArray = this.state.deployedCharts.map((chart) => {
            chart.history = chart.name === currentChart ? versions : [];
          });
          console.log('new deployed charts: ', newDeployedArray)
          this.setState({
            deployedCharts: newDeployedArray
          })
        }
      })
  }
  
  // runs every time setState() is invoked
  componentDidUpdate() {
    // console.log(`userDataDir is ${this.state.userDataDir}`);
    console.log("Main component Updated");
    // This use a helper to setState a list of local charts.
    //console.log(`MainContainer: componentDidMount: hello world`);

    // Use a helper to setState a list of local charts
    if (this.state.userDataDir && this.state.localCharts.length === 0) {
      //console.log(`MainContainer: componentDidMount: this.state.userDataDir is truthy`);
      FSHelper.getLocalCharts(this.state.userChartDir).then((result) => {
        //console.log(`MainContainer: componentDidMount: next log is files.`);
        //console.table(result);
        this.setState({
          localCharts: result,
          //localChartsLoopCount: this.state.localChartsLoopCount += 1
        });
        return result;
      })
      // .then((result) => {
      //   console.log('MY .then IS WORKING');
      //   console.log('deployed charts is ', this.state.deployedCharts);
      //   this.checkDeployedLocalCharts(result);
      // });
    }
  }

  // run upon successful rendering of the component
  componentDidMount() {
    // get list of currently deployed helm charts
    console.log("Main component successfully mounted");
    this.getHelmCharts();

    // ipcRenderer.invoke("getPath", "userData").then((result) => {
    //   this.setState({ userDataDir: result, userChartDir: result + "\\charts" });
    // });
  }

  render(props) {
    //cons ole.log('MainContainer: this.state.userChartDir = ' + this.state.userChartDir);

    return (
      <>
        <LocalChartContainer
          userChartDir={this.state.userChartDir}
          localCharts={this.state.localCharts}
          getDeployedCharts={this.getHelmCharts}
        />
        <InstalledChartContainer
          deployedCharts={this.state.deployedCharts}
          getDeployedCharts={this.getHelmCharts}
        />
        {/* <InstalledChartList deployedCharts={this.state.deployedCharts}/> */}
      </>
    );
  }
}

export default MainContainer;
