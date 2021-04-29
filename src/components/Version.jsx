import React from "react";
import { Table } from "semantic-ui-react";

function Version (props){
  return(
      <Table.Row>
      <Table.Cell colspan = '2'>
        {props.name}
      </Table.Cell>
      </Table.Row>
  )
}

export default Version;