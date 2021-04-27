import React, { Component } from 'react';
const path = require('path');
const { ipcRenderer } = window.require('electron');
import FSHelper from '../helpers/FileSystemHelper';
import LocalChartContainer from './LocalChartContainer';
import InstalledChartContainer from './InstalledChartContainer';
import InstalledChartList from '../components/InstalledChartList';
import getDeployedHelmCharts from '../components/getDeployedHelmCharts';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataDir: null,
      userChartDir: null,
      localCharts: [],
      deployedCharts: [],
      localChartsLoopCount: 0,
      // STDOUT data object(s) here?
    };

    ipcRenderer.invoke('getPath', 'userData').then(result => {
      this.setState({ userDataDir: result, userChartDir: path.join(result, 'charts') });
    });
  }

  componentDidUpdate() {
    //console.log(`MainContainer: componentDidMount: hello world`);

    // Use a helper to setState a list of local charts
    if (this.state.userDataDir && this.state.localCharts.length === 0) {
      //console.log(`MainContainer: componentDidMount: this.state.userDataDir is truthy`);
      FSHelper.getLocalCharts(this.state.userChartDir)
        .then((result) => {
          //console.log(`MainContainer: componentDidMount: next log is files.`);
          this.setState({
            localCharts: result, 
          });
        });
    }
  }

  componentDidMount() {
    // get list of currently deployed helm charts
    //getDeployedHelmCharts()
    //.then(result => JSON.parse(result))
    //.then(charts => {
    //  this.setState( {
    //    deployedCharts: charts
    //  })
    //});
  }

  render(props) {
    //console.log('MainContainer: this.state.userChartDir = ' + this.state.userChartDir);
    return(
      <>
        <LocalChartContainer
          userChartDir={this.state.userChartDir}
          localCharts={this.state.localCharts}
        />
        <InstalledChartList deployedCharts={this.state.deployedCharts}/>
      </>
    );
  }
}

export default MainContainer;