import React,{memo} from 'react'
import ProfileAvatar from '../../ProfileAvatar';
import TimeAgo from 'timeago-react';
import ProfileInfoBtn from './ProfileInfoBtn';
import '../../../styles/main.scss';
import PresenceDot from '../../PresenceDot';
import { Button } from 'rsuite';
import {useCurrentRoom} from "../../../context/current-room.context";
import {auth} from "../../../misc/firebase";


const MessageItem = ({message,handleAdmin}) => {
  const {author,createdAt,text} = message;
  const isAdmin = useCurrentRoom(v=>v.isAdmin);
  const admins = useCurrentRoom(v=>v.admins);
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor

  return (
    <li className='padded mb-1'>
      <div className='d-flex align-items-center font-bolder mb-1'>
         <PresenceDot uid = {author.uid}/>
         <ProfileAvatar src = {author.avatar} name = {author.name} className = "ml-1" size = "xs"/>
         <ProfileInfoBtn profile = {author} appearance = "link" className = "p-0 ml-1 text-black">
            {canGrantAdmin && 
              <Button block color="blue" appearance="primary" onClick={()=>handleAdmin(author.uid)} >
                {isMsgAuthorAdmin ? 'Remove admin permission':'Give admin permission to this room'}
              </Button>}  
         </ProfileInfoBtn>
         <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"/>
      </div>
      <div>
        <span className='word-break-all'>{text}</span>
      </div>
    </li>
  )
}

export default memo(MessageItem);
