import React, { Component } from 'react';
import path from 'path';
import LocalChartList from '../components/LocalChartList';

const { shell } = require('electron');

class LocalChartContainer extends Component {
  constructor(props) {
    super(props);
    this.handleOpenChartClick = this.handleOpenChartClick.bind(this);
  }

  handleOpenChartClick(chartName) {
    const { userChartDir } = this.props;
    const pathToOpen = path.join(userChartDir, chartName);
    shell.openPath(pathToOpen);
  }

  render() {
    const {
      localCharts, userChartDir, getDeployedCharts, showAlert
    } = this.props;

    return (
      <div className="outer-container">
        <LocalChartList
          localCharts={localCharts}
          userChartDir={userChartDir}
          getDeployedCharts={getDeployedCharts}
          handleOpenChartClick={this.handleOpenChartClick}
          showAlert={showAlert}
        />
      </div>
    );
  }
}

export default LocalChartContainer;
