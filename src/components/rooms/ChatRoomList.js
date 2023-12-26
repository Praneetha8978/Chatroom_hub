import React, { useContext } from 'react';
import { Loader, Nav } from 'rsuite';
import RoomItem from './RoomItem';
import '../../styles/main.scss';
import '../../styles/utility.scss';
import { RoomsContext } from '../../context/rooms.context';
import { Link,useLocation } from 'react-router-dom';

const ChatRoomList = ({ aboveElHeight }) => {
  const rooms = useContext(RoomsContext);
  const location = useLocation();

  return (
    <div>
      <Nav
        appearance="subtle"
        vertical
        reversed
        className="overflow-y-scroll custom-scroll"
        activeKey={location.pathname}
      >
        {!rooms && (
          <Loader
            center
            vertical
            content="Loading..."
            speed="slow"
            size="md"
          />
        )}
        {rooms &&
          rooms.length > 0 &&
          rooms.map((room) => (
            <Nav.Item key={room.id} as={Link} to={`/chat/${room.id}`} eventKey = {`/chat/${room.id}`}>
              <RoomItem
                id={room.id}
                name={room.name}
                createdAt={room.createdAt}
                lastMessage={room.lastMessage}
              />
            </Nav.Item>
          ))}
      </Nav>
    </div>
  );
};

export default ChatRoomList;