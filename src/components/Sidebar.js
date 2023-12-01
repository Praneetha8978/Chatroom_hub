import React, { useRef,useState,useEffect } from 'react'
import DashboardToggle from '../components/dashboard/DashboardToggle';
import CreateRoomBtnModel from './CreateRoomBtnModel';
import {Divider} from 'rsuite';
import ChatRoomList from './rooms/ChatRoomList';
import '../styles/main.scss';



const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height,setHeight] = useState(0);
  useEffect(()=>{
    if(topSidebarRef.current){
      setHeight(topSidebarRef.current.getBoundingClientRect().height)
    }
  },[topSidebarRef]);
  return (
    <div className='h-100 pt-2'>
      <div ref = {topSidebarRef}>
        <DashboardToggle/>
        <CreateRoomBtnModel/>
        <Divider>Join conversation</Divider>
      </div>
      <ChatRoomList aboveElHeight = {height}/>
    </div>
  )
}

export default Sidebar
