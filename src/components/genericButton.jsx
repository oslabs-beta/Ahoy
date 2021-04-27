import React from 'react';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
import { Button } from 'semantic-ui-react'

class genericButton extends React.Component {
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
    console.log('button clicked')
    // returns the STDOUT as an object from the command
    this.getTableObj()
    // .then(result => JSON.parse(result))
    // .then(res => console.log(res))
    .then(this.setState( { stateVar: newState }))

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
      <Button onClick={this.handleClick}>
        Get Helm List
      </Button>
    );
  }
}

export default genericButton;