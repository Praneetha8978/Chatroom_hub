import React from 'react';
import { useNavigate } from 'react-router-dom';
import TimeAgo from 'timeago-react';
import '../../styles/main.scss';

const RoomItem = ({ id, name, createdAt }) => {
  const navigate = useNavigate();

  const handleRoomClick = (event) => {
    event.preventDefault();
    navigate(`/chats/${id}`, { replace: true });
  };

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h4 className='text-disappear'>
          <a href={`/chats/${id}`} onClick={handleRoomClick} style={{ textDecoration: 'none', color: 'inherit' }}>
            {name}
          </a>
        </h4>
        <TimeAgo datetime={new Date(createdAt)} className='time-ago font-normal text-black-45' />
      </div>
      <div className='d-flex align-items-center text-black-70'>
        <span>No messages yet....</span>
      </div>
    </div>
  );
};

export default RoomItem;