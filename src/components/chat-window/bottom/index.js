import React from 'react';
import { InputGroup, Input } from 'rsuite';
import SendIcon from '@rsuite/icons/Send';
import '../../../styles/main.scss';

const Bottom = () => {
  return (
    <div>
      <InputGroup >
        <Input name='chat' placeholder='Write new messages here.....'  style={{width:"66%",color: 'black', fontWeight: 'bolder' }}/>
        <InputGroup.Button title="Send Message" color='blue' appearance='primary' >
          <SendIcon />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default Bottom;