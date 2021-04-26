import React, { Component } from 'react';
const util = require('util');
import fs from 'fs';
import LocalChartList from '../components/LocalChartList';
import HelmListBtn from '../components/listHelmBtn';

class LocalChartContainer extends Component {
  constructor(props) {
    super(props);


    // STDOUT data object(s) here?
  }

  render(props) {

    return(
      <div>
        <LocalChartList localCharts={this.props.localCharts} />
        <HelmListBtn data={this.props.datafromButton}/>
      </div>        
    );
  }
}

export default LocalChartContainer;