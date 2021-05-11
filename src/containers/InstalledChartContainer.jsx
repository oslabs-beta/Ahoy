import React, { Component } from 'react';
import InstalledChartList from '../components/InstalledChartList';
import launchDashBoard from '../helpers/launchMiniKubeDashBoard';

class InstalledChartContainer extends Component {
  constructor(props) {
    super(props);
    this.launchMiniKubeDashBoard = this.launchMiniKubeDashBoard.bind(this);
    this.launchDashBoard = launchDashBoard.bind(this);
  }

  // launches minikube dashboard in a browser window
  launchMiniKubeDashBoard() {
    this.launchDashBoard().then((x) => console.log('Dashboard Launched:', x));
  }

  render() {
    const {
      deployedCharts, getDeployedCharts, toggleHistory, doHelmChartRollBack, currentChartHistory,
    } = this.props;

    return (
      <div className="outer-container">
        <InstalledChartList
          deployedCharts={deployedCharts}
          getDeployedCharts={getDeployedCharts}
          toggleHistory={toggleHistory}
          doHelmChartRollBack={doHelmChartRollBack}
          currentChartHistory={currentChartHistory}
          launchMiniKubeDashBoard={this.launchMiniKubeDashBoard}
        />
      </div>
    );
  }
}

export default InstalledChartContainer;
