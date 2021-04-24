import React, { Component } from 'react';
import fs from 'fs';
const { ipcRenderer } = window.require('electron');

//import LocalChartContainer from './LocalChartContainer';
//import InstalledChartContainer from './InstalledChartContainer';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataDir: ''
    };
    //this.exampleBind = this.exampleBind.bind(this);

  }

  componentDidMount() {
    ipcRenderer.invoke('getPath', 'userData').then(result => {
      this.setState({ userDataDir: result });
    });
  }

  render(props) {

    return(
      <>
        <p>I am maincontainer, yes i am</p>
      </>
    );
  }
}

export default MainContainer;