class listHelm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.getTableObj = this.getTableObj.bind(this);
  }

  handleClick() {
    // this.setState(state => ({
    //   isToggleOn: !state.isToggleOn
    // }));
    this.getTableObj().then(result => {
      return JSON.parse(result)
    });
  };

  async getTableObj() {
    try {
      const {stdout, stderr} = await exec('helm list -o json')
      return stdout;
    }
    catch (stderr) {
      console.error('stderr:', stderr);
      return
    }
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