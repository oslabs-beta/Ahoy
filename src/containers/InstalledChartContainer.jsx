import React, { Component } from 'react';

const util = require('util');
import fs from 'fs';
import InstalledChartList from '../components/InstalledChartList';

class InstalledChartContainer extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {

    // console.log('Props at InstalledChartContainer: ', this.props)

    return(
      <div className = 'outer-container'>
        <InstalledChartList 
          deployedCharts={this.props.deployedCharts}
          getDeployedCharts={this.props.getDeployedCharts}
          getHistory={this.props.getHistory}
        />
      </div>        
    );
  }
}

export default InstalledChartContainer;