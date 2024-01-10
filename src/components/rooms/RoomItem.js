import React from 'react';
import TimeAgo from 'timeago-react';
import '../../styles/main.scss';
import ProfileAvatar from '../ProfileAvatar';

const RoomItem = ({ id, name, createdAt,lastMessage }) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear">{name}</h4>
        <TimeAgo
          datetime={lastMessage? new Date(lastMessage.createdAt) : new Date(createdAt)}
          className="time-ago font-normal text-black-45"/>
      </div>
      <div className="d-flex align-items-center text-black-70">
        {
          lastMessage ? 
          <>
            <div className='d-flex align-items-center'>
              <ProfileAvatar src={lastMessage.author.avatar} name={lastMessage.author.name} size="sm"/>
            </div>
            <div className='text-disappear ml-2'>
              <div className='italic'>
                {lastMessage.author.name}
              </div>
              <span>
                {lastMessage.text || lastMessage.file.name}
              </span>
            </div>
          </> :
          <span>No messages yet....</span>
        }
        
      </div>
    </div>
  );
};

export default RoomItem;