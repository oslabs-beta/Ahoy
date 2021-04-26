import React, { Component } from 'react';
const util = require('util');
import fs from 'fs';
import LocalChartList from '../components/LocalChartList';
import HelmListBtn from '../components/listHelmBtn';

class LocalChartContainer extends Component {
  constructor(props) {
    super(props);
  }

  render(props) {

    return(
      <>
        <p>LocalChartContainer</p>
        {/* <LocalChartList localCharts={this.props.localCharts} /> */}
        <HelmListBtn />
      </>
    );
  }
}

export default LocalChartContainer;