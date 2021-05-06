import React from 'react';
import InstalledChartList from '../components/InstalledChartList';

const InstalledChartContainer = (props) => {
  const {
    deployedCharts, getDeployedCharts, getHistory, doHelmChartRollBack, currentChartHistory,
  } = props;
  return (
    <div className="outer-container">
      <InstalledChartList
        deployedCharts={deployedCharts}
        getDeployedCharts={getDeployedCharts}
        getHistory={getHistory}
        doHelmChartRollBack={doHelmChartRollBack}
        currentChartHistory={currentChartHistory}
      />
    </div>
  );
};

export default InstalledChartContainer;
