import React, { Component } from 'react';
import LocalChartList from '../components/LocalChartList';

class LocalChartContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChartOpenpathClick = this.handleChartOpenpathClick.bind(this);
    this.openpath = this.openpath.bind(this);
  }

  handleChartOpenpathClick(e) {
    console.log(e);
  }

  openpath(props) {

  }

  render(props) {
    return (
      <div className='outer-container'>
        <LocalChartList
          localCharts={this.props.localCharts}
          userChartDir={this.props.userChartDir}
          getDeployedCharts={this.props.getDeployedCharts}
        />
      </div>
    );
  }
}

export default LocalChartContainer;
