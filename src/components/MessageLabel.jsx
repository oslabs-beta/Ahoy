import React from 'react'
import { Message } from 'semantic-ui-react'

const MessageLabel = (props) => (
  <Message visible>{props.message}</Message>
)

export default MessageLabel