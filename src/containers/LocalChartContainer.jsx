import React, { Component } from "react";
const util = require("util");
import fs from "fs";
import LocalChartList from "../components/LocalChartList";

class LocalChartContainer extends Component {
  constructor(props) {
    super(props);

    // STDOUT data object(s) here?
  }

  render(props) {
    // console.log("Props at LocalChartContainer: ", this.props);

    // userChartDir:
    //"/Users/joebigelow/Library/Application Support/ahoy/charts” <- mac
    // "C:\Users\Jin\AppData\Roaming\ahoy/charts" <- windows

    return (
      <div className = 'outer-container'>
        <LocalChartList
          localCharts={this.props.localCharts}
          userChartDir={this.props.userChartDir}
          getDeployedCharts={this.props.getDeployedCharts}
        />
      </div>
    );
  }
}

export default LocalChartContainer;
