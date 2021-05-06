import React from 'react';
import InstalledChartList from '../components/InstalledChartList';

const InstalledChartContainer = (props) => {
  const {
    deployedCharts, getDeployedCharts, toggleHistory, doHelmChartRollBack, currentChartHistory,
  } = props;
  return (
    <div className="outer-container">
      <InstalledChartList
        deployedCharts={deployedCharts}
        getDeployedCharts={getDeployedCharts}
        toggleHistory={toggleHistory}
        doHelmChartRollBack={doHelmChartRollBack}
        currentChartHistory={currentChartHistory}
      />
    </div>
  );
};

export default InstalledChartContainer;
