import React, { Component } from "react";
import fs from "fs";
const { ipcRenderer } = window.require("electron");
import FSHelper from "../helpers/FileSystemHelper";
import LocalChartContainer from "./LocalChartContainer";
import InstalledChartContainer from "./InstalledChartContainer";
import InstalledChartList from "../components/InstalledChartList";
import getDeployedHelmCharts from "../components/getDeployedHelmCharts";

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

    ipcRenderer.invoke("getPath", "userData").then((result) => {
      this.setState({ userDataDir: result, userChartDir: result + "\\charts" });
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
        this.setState({
          deployedCharts: charts,
        });
      });
  }
  
  // runs every time setState() is invoked
  componentDidUpdate() {
    console.log(`userDataDir is ${this.state.userDataDir}`);
    console.log("Main component Updated");
    // This use a helper to setState a list of local charts.
    //console.log(`MainContainer: componentDidMount: hello world`);
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
