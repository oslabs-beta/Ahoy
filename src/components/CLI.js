import React, { Component } from 'react';
const { exec } = require('child_process');

class CLI extends Component {
  constructor(props) {
    super(props);
    this.state = { 'info-content': ''};
    this.buttonHandler = this.buttonHandler.bind(this);
  }

  buttonHandler(e) {
    console.log('we will do something');
    exec('kubectl get svc', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });

  }

  render(props) {
    return (
      <>
        <button id="do-something" onClick={this.buttonHandler}>Do Something</button>
        {/*<div id="info">{this.info-content}</div>*/}
      </>
    );
  }
}

export default CLI;