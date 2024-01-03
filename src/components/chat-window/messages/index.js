import React,{useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {database} from '../../../misc/firebase';
import {ref,orderByChild,query,equalTo,onValue,off} from "firebase/database";
import {transformToArrWithId} from '../../../misc/helper';
import MessageItem from './MessageItem';

const Messages = () => {
  const {chatId} = useParams();
  const [messages,setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(()=>{
    const messagesRef = ref(database,'/messages');
    const queryGet = query(messagesRef, orderByChild('roomId'), equalTo(chatId));
    console.log("query"+" "+queryGet);
    onValue(queryGet, (snapshot) => {
      console.log("inside messages yay");
      const data = transformToArrWithId(snapshot.val());
      setMessages(data);
    });
    return ()=>{
      off(messagesRef,'value');
    }
  },[chatId]);

  return (
    <ul className='msg-list custom-scroll'>
      {isChatEmpty && <li>No messages yet...</li>}
      {canShowMessages && messages.map(msg => <MessageItem key = {msg.id} message = {msg}/>)}
    </ul>
  )
}

export default Messages
