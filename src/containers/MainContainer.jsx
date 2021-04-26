import React, { Component } from 'react';
import fs from 'fs';
const { ipcRenderer } = window.require('electron');
import FSHelper from '../helpers/FileSystemHelper';
import LocalChartContainer from './LocalChartContainer';
import { Button } from 'semantic-ui-react'
//import InstalledChartContainer from './InstalledChartContainer';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataDir: null,
      userChartDir: null,
      localCharts: [],
      localChartsLoopCount: 0,
      // STDOUT data object(s) here?
    };
    ipcRenderer.invoke('getPath', 'userData').then(result => {
      this.setState({ userDataDir: result, userChartDir: result + '/charts' });
    });
  }

  componentDidUpdate() {
    // This use a helper to setState a list of local charts.
    //console.log(`MainContainer: componentDidMount: hello world`);
    if (this.state.userDataDir && this.state.localCharts.length === 0) {
      //console.log(`MainContainer: componentDidMount: this.state.userDataDir is truthy`);
      FSHelper.getLocalCharts(this.state.userChartDir)
        .then((result) => {
          //console.log(`MainContainer: componentDidMount: next log is files.`);
          //console.table(result);
          this.setState({
            localCharts: result, 
            //localChartsLoopCount: this.state.localChartsLoopCount += 1
          });
        });
    }
  }


  render(props) {
    //console.log('MainContainer: this.state.userChartDir = ' + this.state.userChartDir);
    return(
      <>
        <Button primary>Semantic Primary</Button>
        <Button secondary>Semantic Secondary</Button>
        <LocalChartContainer
          userChartDir={this.state.userChartDir}
          localCharts={this.state.localCharts}
        />
      </>
    );
  }
}

export default MainContainer;