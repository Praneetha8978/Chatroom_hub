import React,{memo} from 'react'
import ProfileAvatar from '../../ProfileAvatar';
import TimeAgo from 'timeago-react';
import ProfileInfoBtn from './ProfileInfoBtn';
import '../../../styles/main.scss';
import PresenceDot from '../../PresenceDot';
import { Button } from 'rsuite';
import {useCurrentRoom} from "../../../context/current-room.context";
import {auth} from "../../../misc/firebase";
import IconBtnControl from './IconBtnControl';
import {useHover} from '../../../misc/custom-hooks';
import ImgBtnModal from './ImgBtnModal';

const renderFileMessage = (file) => {
  if (file.contentType.includes('image')) {
    return (
      <div className="height-220 mt-2">
        <ImgBtnModal src={file.url} fileName={file.name} />
      </div>
    );
  }
  if(file.contentType.includes('audio')){
    return (
      <audio controls>
        <source src={file.url} type='audio/mp3'/>
        Your browser does not support the audio element...
      </audio>
    );
  }
  return <a href={file.url}>Download {file.name}</a>
}

const MessageItem = ({message,handleAdmin,handleLike,handleDelete}) => {
  const {author,createdAt,text,file,likes,likeCount} = message;
  const [selfRef, isHovered] = useHover();
  const isMobile = window.innerWidth <= 767;
  const isAdmin = useCurrentRoom(v=>v.isAdmin);
  const admins = useCurrentRoom(v=>v.admins);
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;
  const canShowIcons = isMobile || isHovered;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);
  


  return (
    <li className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`}
    ref={selfRef}>
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
          <IconBtnControl {...(isLiked ? {color : 'red',appearance:'primary'} : {})} isVisible = {canShowIcons} iconName = "heart" tooltip = "Like this message" onClick = {()=>{handleLike(message.id)}} badgeContent={likeCount}/>
          {
            isAuthor && (
              <IconBtnControl  isVisible = {canShowIcons} iconName = "close" tooltip = "Delete this message" onClick = {()=>{handleDelete(message.id,file)}} />
            )
          }
      </div>
      <div>
        {
          text && <span className='word-break-all'>{text}</span>
        }
        {
          file && renderFileMessage(file)
        }
        
      </div>
    </li>
  )
}

export default memo(MessageItem);
