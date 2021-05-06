import React from 'react';
import InstalledChartList from '../components/InstalledChartList';

const InstalledChartContainer = (props) => {
  const {
    deployedCharts, getDeployedCharts, getHistory, currentChartHistory,
  } = props;
  return (
    <div className="outer-container">
      <InstalledChartList
        deployedCharts={deployedCharts}
        getDeployedCharts={getDeployedCharts}
        getHistory={getHistory}
        currentChartHistory={currentChartHistory}
      />
    </div>
  );
};

export default InstalledChartContainer;
