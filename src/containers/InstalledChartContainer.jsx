import React, { Component } from 'react';

const util = require('util');
import fs from 'fs';
import InstalledChartList from '../components/InstalledChartList';

class InstalledChartContainer extends Component {
  constructor(props) {
    super(props);


    // STDOUT data object(s) here?
  }

  render(props) {

    console.log('Props at InstalledChartContainer: ', this.props)

    return(
      <div>
        <InstalledChartList localCharts={this.props.deployedCharts} />
      </div>        
    );
  }
}


export default InstalledChartContainer;