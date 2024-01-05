import React,{useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {database} from '../../../misc/firebase';
import {ref,orderByChild,query,equalTo,onValue,off,runTransaction} from "firebase/database";
import {transformToArrWithId} from '../../../misc/helper';
import MessageItem from './MessageItem';
import { ToastContainer, toast } from 'react-toastify';


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

  const handleAdmin = useCallback(async(uid)=>{
    const adminsRef = ref(database,`/rooms/${chatId}/admins`);
    let alertMsg;
    await runTransaction(adminsRef, (admins) => {
      if (admins) {
        if (admins[uid]) {
          admins[uid] = null;
          alertMsg = 'Admin permission removed';
        } else {
          admins[uid] = true;
          alertMsg = 'Admin permission granted';
        }
      }
      return admins;
    });
    toast.info(alertMsg, {
      position: toast.POSITION.TOP_CENTER, // Align to the center
      autoClose: 4000, // Auto-close the alert after 5000 milliseconds (5 seconds)
    });
  },[chatId])

  return (
    <ul className='msg-list custom-scroll'>
      {isChatEmpty && <li>No messages yet...</li>}
      {canShowMessages && messages.map(msg => <MessageItem key = {msg.id} message = {msg} handleAdmin={handleAdmin}/>)}
    </ul>
  )
}

export default Messages
