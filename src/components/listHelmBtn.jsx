import React from 'react';
const util = require('util');
const exec = util.promisify(require('child_process').exec);

class listHelm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.getTableObj = this.getTableObj.bind(this);
  }

  handleClick() {
    // this.setState(state => ({
    //   isToggleOn: !state.isToggleOn
    // }));
    console.log('button clicked')
    // this.getTableObj().then(result => console.log(result))
    this.getTableObj()
    .then(result => JSON.parse(result))
    .then(res => this.setState({data: res}))
    .then(console.log(this.state))
  };

  async getTableObj() {
    try {
      const {stdout, stderr} = await exec('helm list -o json')
      return stdout;
    }
    catch (stderr) {
      console.error('stderr:', stderr);
      return stderr
    }
      // const {stdout, stderr} = await exec('helm list -o json')
      // return stdout;
  };


  render() {
    return (
      <button onClick={this.handleClick}>
        {/* {this.state.isToggleOn ? 'ON' : 'OFF'} */}
      </button>
    );
  }
}

export default listHelm;