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
      <>
        <p>LocalChartContainer</p>
        <LocalChartList localCharts={this.props.localCharts} datafromButton={this.props.datafromButton}/>
        <HelmListBtn data={this.props.datafromButton}/>

        {/* <Button string={install}, prop2={onclickfcn}} */}

      </>
    );
  }
}

export default LocalChartContainer;