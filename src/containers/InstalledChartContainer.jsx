import React from 'react';
import InstalledChartList from '../components/InstalledChartList';

const InstalledChartContainer = (props) => {
  const {
    deployedCharts, getDeployedCharts, toggleHistory, currentChartHistory,
  } = props;
  return (
    <div className="outer-container">
      <InstalledChartList
        deployedCharts={deployedCharts}
        getDeployedCharts={getDeployedCharts}
        toggleHistory={toggleHistory}
        currentChartHistory={currentChartHistory}
      />
    </div>
  );
};

export default InstalledChartContainer;
