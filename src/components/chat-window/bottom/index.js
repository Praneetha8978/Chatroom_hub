import React,{useCallback, useState,useContext} from 'react';
import { InputGroup, Input } from 'rsuite';
import SendIcon from '@rsuite/icons/Send';
import '../../../styles/main.scss';
import { ref,serverTimestamp,push,update } from 'firebase/database';
import { ProContext } from '../../../context/ProfileContext';
import {useParams} from 'react-router-dom';
import {database} from '../../../misc/firebase';
import { ToastContainer, toast } from 'react-toastify';

function assembleMessage(profile,chatId){
  return{
    roomId : chatId,
    author : {
      name : profile.name,
      uid : profile.uid,
      createdAt : profile.createdAt,
      ...(profile.avatar ? {avatar : profile.avatar} : {})
    },
    createdAt : serverTimestamp(),
  }
}

const Bottom = () => {
  const [input,setInput] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const {chatId} = useParams();
  const {profile} = useContext(ProContext);

  const onInputChange = useCallback((value)=>{
    setInput(value);
  },[]);

  const onSendClick = async() => {
    if(input.trim() === ""){
      return;
    }
    const msgData = assembleMessage(profile,chatId);
    console.log(msgData);
    msgData.text = input;

    const updates = {};
    const messageId = push(ref(database, 'messages'));
    const newMessageKey = messageId.key;
    console.log(newMessageKey);
    updates[`/messages/${newMessageKey}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId : newMessageKey,
    };
    setIsLoading(true);
    try{
      await update(ref(database), updates);
      setInput('');
      setIsLoading(false);
    }catch(err){
      setIsLoading(false);
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
    
  }

  const onKeyDown = (ev) => {
    console.log(ev);
    console.log(ev.keyCode);
    if(ev.keyCode === 13){
      ev.preventDefault();
      onSendClick();
    }
  }

  return (
    <div>
      <InputGroup style={{width : "66%"}}>
        <Input name='chat' placeholder='Write new messages here.....' value = {input} onChange={onInputChange} onKeyDown={onKeyDown} style={{width:"66%",color: 'black', fontWeight: 'bolder' }}/>
        <InputGroup.Button title="Send Message" color='blue' appearance='primary' onClick={onSendClick} disabled={isLoading}>
          <SendIcon />
        </InputGroup.Button>
      </InputGroup>
      <ToastContainer />
    </div>
  );
};

export default Bottom;