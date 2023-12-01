import React, { useContext } from 'react';
import { Loader, Nav } from 'rsuite';
import RoomItem from './RoomItem';
import '../../styles/main.scss';
import '../../styles/utility.scss';
import { RoomsContext } from '../../context/rooms.context';

const ChatRoomList = ({ aboveElHeight }) => {
  const rooms = useContext(RoomsContext);

  return (
    <div>
      <Nav
        appearance="subtle"
        vertical
        reversed
        className="overflow-y-scroll custom-scroll"
        style={{
          height: `calc(100% - ${aboveElHeight}px )`,
        }}
      >
        {!rooms && (
          <Loader
            center
            vertical
            content="Loading...."
            speed="slow"
            size="md"
          />
        )}
        {rooms &&
          rooms.length > 0 &&
          rooms.map(room => {
            return(
              <Nav.Item key={room.id} componentClass="div">
                <RoomItem id = {room.id} name={room.name} createdAt={room.createdAt} />
              </Nav.Item>
            )
          }
            
          )}
      </Nav>
    </div>
  );
};

export default ChatRoomList;