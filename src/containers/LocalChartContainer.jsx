import React, { Component } from 'react';
const util = require('util');
import fs from 'fs';
import LocalChartList from '../components/LocalChartList';

class LocalChartContainer extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {

    return(
        <LocalChartList localCharts={this.props.localCharts} />
    );
  }
}

export default LocalChartContainer;