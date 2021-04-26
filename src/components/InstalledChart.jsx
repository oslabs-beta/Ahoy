import React from 'react';

const InstalledChart = (props) => {
  return (
      <tr><td>{props.name}</td><td><button>install</button></td></tr>
  )
};

export default InstalledChart;
