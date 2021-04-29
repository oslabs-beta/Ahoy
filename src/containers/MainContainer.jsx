import React, { Component } from "react";
const path = require("path");
const { ipcRenderer } = window.require("electron");
import FSHelper from "../helpers/FileSystemHelper";
import LocalChartContainer from "./LocalChartContainer";
import InstalledChartContainer from "./InstalledChartContainer";
import InstalledChartList from "../components/InstalledChartList";
import getDeployedHelmCharts from "../helpers/getDeployedHelmCharts";
import getHelmHistory from "../helpers/getHelmHistory";
import { Button } from "semantic-ui-react";
import launchDashBoard from "../helpers/launchMiniKubeDashBoard";
// import getHelmHistory from '../helpers/getHelmHistory';
import Version from '../components/Version';

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
      currentChartHistory:[],
      // STDOUT data object(s) here?
    };

    ipcRenderer.invoke("getPath", "userData").then((result) => {
      this.setState({
        userDataDir: result,
        userChartDir: path.join(result, "charts"),
      });
    });

    this.getHelmCharts = this.getHelmCharts.bind(this);
    this.getHistory = this.getHistory.bind(this);
    this.launchMiniKubeDashBoard = this.launchMiniKubeDashBoard.bind(this);
  }


  launchMiniKubeDashBoard() {
    console.log("Launching Minikube Dashboard...");
    launchDashBoard().then(x => console.log('Dashboard Launched:', x))
    return 
  }

  checkDeployedLocalCharts(result) {
    console.log("in checkDeployedLocalCharts");
    let booleansArray = [];
    result.forEach((chart) => {
      let boolean = false;
      for (let i = 0; i < this.state.deployedCharts.length; i++) {
        console.log(
          `Deployed chart name is ${this.state.deployedCharts[i].name}`
        );
        console.log(`Local chart name is ${chart}`);
        if (this.state.deployedCharts[i].name === chart) boolean = true;
      }
      booleansArray.push(boolean);
    });
    this.setState({ islocalChartDeployed: booleansArray });
  }

  getHelmCharts() {
    getDeployedHelmCharts()
      .then((result) => JSON.parse(result))
      .then((charts) => {
        // console.log(`Deployed charts array looks like this: ${charts}`);
        this.setState({
          deployedCharts: charts,
        });
      });
  }

  // Jin & Joe's original version
  getHistory(currentChart) {
    getHelmHistory(currentChart)
      .then((result) => JSON.parse(result))
      .then((versions) => {
        // can we also set state currentChartHistory here, so we can render that state as is-in InstalledChart.jsx line 111?
        // console.log("versions", versions);
        this.setState({
          currentChartHistory: versions,
        });
        console.log("MainContainer.jsx line 86: currentChartHistory ", this.state.currentChartHistory )
        console.log("deployedcharts", this.state.deployedCharts);
        const newDeployedArray = this.state.deployedCharts.map((chart) => {
          // console.log("chart: ", chart);
          // console.log("chart name: ", chart.name);
          if (chart.name === currentChart) {
            console.log("entered here");
            chart.history = versions;
          }
          return chart; /// <-- this was the problem
        });
        // // })
        // console.log("versions: ", versions);
        // console.log("deployedcharts2", this.state.deployedCharts);
        // console.log("newDeployedArray: ", newDeployedArray);
        return newDeployedArray;
      })
      .then((newDeployedArray) => {
        console.log("new deployed charts: ", newDeployedArray);
        this.setState({
          deployedCharts: newDeployedArray,
        });
      });
  }


  // getHistory(currentChart) {
  //   getHelmHistory(currentChart)
  //     .then((result) => JSON.parse(result))
  //     .then((versions) => {
  //       console.log("deployedcharts", this.state.deployedCharts);
  //       const newDeployedArray = this.state.deployedCharts.map((chart) => {
  //         // console.log("chart: ", chart);
  //         // console.log("chart name: ", chart.name);
  //         if (chart.name === currentChart) {
  //           console.log("history get get here");
  //           // chart.history = versions;
  //           // let temp = JSON.parse(versions)
  //           // chart.history = `<tr><td>${temp}</td></tr>`;
  //           chart.history = <Version name = {versions} />
  //           // console.log('chart.history :' , chart.history)
  //         }
  //         return chart; /// <-- this was the problem
  //       });
  //       return newDeployedArray;
  //     })
  //     .then((newDeployedArray) => {
  //       console.log("new deployed charts: ", newDeployedArray);
  //       this.setState({
  //         deployedCharts: newDeployedArray,
  //       });
  //       return this.state.deployedCharts;
  //     })
  //     // .then((AppData) => {
  //     //   console.log('now that history has value. lets render that cells');
  //     //   console.log('what I get :' ,AppData)
  //     // })
  // }


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
      });
      // .then((result) => {
      //   console.log('MY .then IS WORKING');
      //   console.log('deployed charts is ', this.state.deployedCharts);
      //   this.checkDeployedLocalCharts(result);
      // });
    }

    // this.getHistory('wordpress');
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
        <Button onClick={() => this.launchMiniKubeDashBoard()}>
          Launch Dashboard
        </Button>

        <LocalChartContainer
          userChartDir={this.state.userChartDir}
          localCharts={this.state.localCharts}
          getDeployedCharts={this.getHelmCharts}
        />
        <InstalledChartContainer
          deployedCharts={this.state.deployedCharts}
          currentChartHistory = {this.state.currentChartHistory}
          getDeployedCharts={this.getHelmCharts}
          getHistory={this.getHistory}
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
