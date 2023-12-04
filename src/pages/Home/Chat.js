import React,{useContext} from 'react';
import {useParams} from 'react-router-dom';
import {Loader} from 'rsuite';
import ChatTop from '../../components/chat-window/top/index';
import ChatBottom from '../../components/chat-window/bottom/index';
import Messages from '../../components/chat-window/messages/index';
import '../../styles/main.scss';
import { RoomsContext } from '../../context/rooms.context';

const Chat = () => {

  const {chatId} = useParams();
  const rooms = useContext(RoomsContext);
  if(!rooms){
    return <Loader center vertical size = "md" content = "Loading..." speed='slow'></Loader>
  }

  const currentRoom = rooms.find(room => room.id === chatId);

  if(!currentRoom){
    return <h6 className='text-center mt-page'>Chat {chatId} not found</h6>
  }
    
  return (
    <>
      <div className='chat-top'>
        <ChatTop/>
      </div>
      <div className='chat-middle'>
        <Messages/>
      </div>
      <div className='chat-bottom' style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <ChatBottom/>
      </div>
    </>
  )
}

export default Chat
