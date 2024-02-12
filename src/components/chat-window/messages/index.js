import React,{useCallback, useEffect, useRef, useState} from 'react';
import {Button} from 'rsuite';
import {useParams} from 'react-router-dom';
import {auth,database, storage} from '../../../misc/firebase';
import {ref,orderByChild,query,equalTo,onValue,off,runTransaction,update,limitToLast} from "firebase/database";
import {ref as storageRef,deleteObject} from "firebase/storage";
import {transformToArrWithId} from '../../../misc/helper';
import MessageItem from './MessageItem';
import { ToastContainer, toast } from 'react-toastify';
import {groupBy} from '../../../misc/helper'


const pageSize = 15;
const messagesRef = ref(database,'/messages');
function shouldScrollToBottom(node,threshold = 30){
  const percentage = (100*node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0;
  return percentage > threshold;
}
const Messages = () => {
  const {chatId} = useParams();
  const [messages,setMessages] = useState(null);
  const [limit,setLimit] = useState(pageSize);
  const selfRef = useRef();

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;
  const loadMessages = useCallback((limit)=>{
    const node = selfRef.current;
    off(messagesRef);
    const queryGet = query(messagesRef, orderByChild('roomId'), equalTo(chatId),limitToLast(limit || pageSize));
    console.log("query"+" "+queryGet);
    onValue(queryGet, (snapshot) => {
      console.log("inside messages yay");
      const data = transformToArrWithId(snapshot.val());
      setMessages(data);
      if(shouldScrollToBottom(node)){
        node.scrollTop = node.scrollHeight;
      }
    });
    setLimit(p => p + pageSize);
  },[chatId]);

  const onLoadMore = useCallback(()=>{
    const node = selfRef.current;
    const oldHeight = node.scrollHeight;
    loadMessages(limit);
    setTimeout(()=>{
      const newHeight = node.scrollHeight;
      node.scrollTop = newHeight - oldHeight;
    })
  },[loadMessages,limit]);

  useEffect(()=>{
    const node = selfRef.current;
    loadMessages();
    setTimeout(()=>{
      node.scrollTop = node.scrollHeight;
    },200);
    return ()=>{
      off(messagesRef,'value');
    }
  },[loadMessages]);

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

  const handleLike = useCallback(async(msgId)=>{
    const {uid} = auth.currentUser;
    const msgRef = ref(database,`/messages/${msgId}`);
    let alertMsg;
    await runTransaction(msgRef, (msg) => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          alertMsg = 'Like removed';
        } else {
          msg.likeCount += 1;
          if(!msg.likes){
            msg.likes = {};
          }
          msg.likes[uid] = true;
          alertMsg = 'Like added';
        }
      }
      return msg;
    });
    toast.info(alertMsg, {
      position: toast.POSITION.TOP_CENTER, // Align to the center
      autoClose: 4000, // Auto-close the alert after 5000 milliseconds (5 seconds)
    });
  },[]);

  const handleDelete = useCallback(async(msgId,file)=>{
    if(!window.confirm('Delete this message?')){
      return;
    }
    const isLast = messages[messages.length - 1].id == msgId;
    const updates = {};
    updates[`/messages/${msgId}`] = null;
    if(isLast && messages.length > 1){
      updates[`/rooms/${chatId}/lastMessage`] = {
        ...messages[messages.length - 2],
        msgId : messages[messages.length - 2].id
      }
    }
    if(isLast && messages.length === 1){
      updates[`/rooms/${chatId}/lastMessage`] = null;
    }
    try{
      await update(ref(database),updates);
      toast.info('Message has been deleted', {
        position: toast.POSITION.TOP_CENTER, // Align to the center
        autoClose: 4000, // Auto-close the alert after 5000 milliseconds (5 seconds)
      });
    }catch(err){
      return toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER, // Align to the center
        autoClose: 4000, // Auto-close the alert after 5000 milliseconds (5 seconds)
      });
    }
    if(file){
      try{
        const fileRef = await storageRef(storage,file.url);
        await deleteObject(fileRef);
      }catch(err){
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER, // Align to the center
          autoClose: 4000, // Auto-close the alert after 5000 milliseconds (5 seconds)
        });
      }
    }
  },[chatId,messages])

  const renderMessages = () => {
    const groups = groupBy(messages,(item) => new Date(item.createdAt).toDateString());
    const items = [];
    Object.keys(groups).forEach((date)=>{
      items.push(<li key={date} className='text-center mb-1 padded'>{date}</li>)
      const msgs = groups[date].map(msg=>(
        <MessageItem key = {msg.id} message = {msg} handleAdmin={handleAdmin} handleLike={handleLike} handleDelete={handleDelete}/>
      ))
      items.push(...msgs);
    })
    return items;
  }
  return (
    <ul ref={selfRef} className='msg-list custom-scroll'>
      {messages && messages.length >= pageSize && (
        <li className='text-center mt-2 mb-2'>
          <Button onClick={onLoadMore} color='green' appearance='primary'>Load more</Button>
        </li>
      )}
      {isChatEmpty && <li>No messages yet...</li>}
      {canShowMessages && renderMessages()}
    </ul>
  )
}

export default Messages;
