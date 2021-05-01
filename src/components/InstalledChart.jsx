import React from "react";
import {useState, useEffect} from "react";
import { Button, Table, Dropdown, Menu } from "semantic-ui-react";
import Version from './Version';
import moment from 'moment';
// import { Table } from 'semantic-ui-react';
// import {Dropdown} from 'semantic-ui-react';
const util = require("util");
const exec = util.promisify(require("child_process").exec);

// console.log("InstalledChart.jsx loaded");

const InstalledChart = (props) => {
  // console.log("props at InstalledChart: ", props);


  const chart = props.chartItem;
  const currentChartHistory = props.currentChartHistory;
  console.log(' InstalledChart.jsx line 18: currentChartHistory', currentChartHistory)
  const chartDetails = [];

  for (let key in chart) {
    chartDetails.push(chart[key] + " ");
    console.log('chartDetails line 24 ' , chartDetails)
  }

  const [historyClicked, setHistoryClicked] = useState(false);

  // const historyArray = []

  useEffect(() => {
      // for loop looking at chart.history
      // for (let i = 0; i < 5; i++){
      //   // For each element, push <Version name={chart.name}/> into the array
      //   historyArray.push(<Version name={chart.name}/>);
      // };
      return async () => {
        
        console.log('what chart are we getting?: ', chart)
        await props.getHistory(chart.name);
        console.log("I am going to render the chart: " , chart);
        
      }
   }, [historyClicked]);


  // uninstall the helm chart. saving STDOUT into object not yet implemented
  const uninstallHelmChart = async () => {
    console.log("uninstalling helm chart: ", chart.name);
    const helmChart = chart.name;
    const { stdout, stderr } = await exec(`helm uninstall ${helmChart}`);

    console.log("component successfully uninstalled");
    // update the charts
    props.getDeployedCharts();
  };

  console.log(`Installed Chart History on ${chart.name}: ${JSON.stringify(chart.history)}`);
  

  // async await call getHistory(), then showHistory()

  const showHistory = (hisArr) => {
    console.log('InstalledChart line 63: currentChartHistory', hisArr)
    console.log('showHistory: chart?', chart)
    // console.log('running getHistory():', props.getHistory('ahoy-apache'))
    // props.getHistory(chartName);
    // Declare empty array
    const historyArray = []
    console.log('what about regular history: ',chart.history)
    console.log('JSONed history: ', JSON.stringify(chart.history))
    // for loop looking at chart.history
    // for (let i = 0; i < hisArr.length; i++){
    for (let i = 0; i < 2; i++){
      // For each element, push <Version name={chart.name}/> into the array
      // console.log('aaa', chart.name)
      console.log('lie 76: ', hisArr[i]);
      const revision = hisArr[i]
      historyArray.push(<Version name={chart.name}/>);
      historyArray.push(<Version key={i} name={revision}/>);
    }

    return historyArray
  };

  const histArray = showHistory(chart)
  
  //const histArray = showHistory(currentChartHistory)
  

  // build the installed chart component
  return (
    <Table.Row>
      <Table.Cell className="installed-chart-cell">
        <Table className="borderless">
          <Table.Body>
            <Table.Row>
            <Table.Cell>
              {chartDetails}
            </Table.Cell>
            <Table.Cell>
              <Button
                    className="button-right"
                    onClick={ () =>{setHistoryClicked(true)} }
                    size='tiny' 
                    compact
                    >History
              </Button>
              
              <Button
                    className="button-right"
                    onClick={() => uninstallHelmChart()}
                    size='tiny' 
                    compact 
              >Uninstall
              </Button>
            </Table.Cell>
            </Table.Row>
            <div>{historyClicked && 
                histArray
              }</div>
             
            {/* <div>{historyClicked && chart.history}</div>  */}
          </Table.Body>
        </Table>
      </Table.Cell>
    </Table.Row>



// const charElems = characters.map((char, i) => {
//   return (
//     <CharacterCard
//       key={i}
//       info={char}
//       getHistory={this.getHistory}
//     />
//   );
// });


// {this.state.modalState.open &&
//   <DetailsModal
//     type={this.state.modalState.type}
//     position={this.state.modalState.position}
//     id={this.state.modalState.id}
//     closeModal={this.closeModal}
//   />
// }

// openModal(type, position, id) {
//   this.setState({
//     modalState: {
//       ...this.state.modalState,
//       open: true,
//       type,
//       position,
//       id
//     }
//   });
// }

// closeModal() {
//   this.setState({
//     modalState: {
//       ...this.state.modalState,
//       open: false
//     }
//   });
// }




    // {/* <Menu className="dropdown-list">
    //   <Menu.Menu position="right">

    //     <Dropdown
    //       item
    //       simple
    //       text="Rollback"
    //       direction="right"
    //       options={optionToRollBack}
    //     />
    //   </Menu.Menu>
    // </Menu> */}
    // {/* {chartDetails}
    // <Menu.Menu position = 'right'>
    //   <Dropdown
    //     placeholder = 'action'
    //     fluid
    //     selection
    //     className = "dropdown-list"
    //     options={OptionToRollBack}
    //   />
    // </Menu.Menu> */}

    // plain semantic (not react.semantic-ui) way of writing the dropdown list out
    // <div className = 'chart-item-box ui fluid selection dropdown'>
    // <i class="dropdown icon">aaa</i>
    //   <div className = 'chart-item-details text'>
    //   {chartDetails}
    //   </div>
    //   <div className = 'chart-button-container'>
    //     <Button onClick={() => uninstallHelmChart()}>Uninstall</Button>
    //   </div>
    // </div>
  );
};

export default InstalledChart;
