import React from 'react';


// create function to execute a CLI
let helmChart = 'my-wordpress'
str = `helm install ${helmChart}`

function handleClick() {
  e.preventDefault();
  console.log(`Installing ${helmChart}...`)


}

const installHelm = (props) => {
  return (
      <button onClick={this.handleClick}>
        Install
      </button>
  )
};

export default installHelmBtn;
