import React from 'react';
import {usePresence} from '../misc/custom-hooks';
import {Whisper,Tooltip,Badge} from 'rsuite';

const getColor = (presence) => {
    if(!presence){
        return 'grey';
    }
    switch(presence.state){
        case "online":
            return 'green';
        case "offline":
            return 'red';
        default:
            return 'grey';            
    }
}

const getText = (presence) => {
    
    if(!presence){
        return "Unknown state";
    }
    return presence.state === 'online' ? 'Online' : `Last online ${new Date(presence.last_changed).toLocaleDateString()}`;
}

const PresenceDot = ({uid}) => {
  console.log(uid);
  const presence = usePresence(uid);
  console.log("pre"+" "+presence);
  return (
    <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>
        {getText(presence)}
      </Tooltip>}>
      <Badge className='cursor-pointer' style={{backgroundColor:getColor(presence)}}/>
    </Whisper>
  )
}

export default PresenceDot
