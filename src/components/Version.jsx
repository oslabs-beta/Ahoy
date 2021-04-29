import React from "react";
import { Table } from "semantic-ui-react";

function Version (props){
  return(
      <div>
      <Table.Row>
        <Table.Cell colSpan = '2'>
          {props.name}
        </Table.Cell>
      </Table.Row>
      </div>
  )
}

export default Version;