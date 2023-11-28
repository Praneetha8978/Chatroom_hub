import React from 'react'
import DashboardToggle from '../components/dashboard/DashboardToggle';
import CreateRoomBtnModel from './CreateRoomBtnModel';

const Sidebar = () => {
  return (
    <div className='h-100 pt-2'>
      <div>
        <DashboardToggle/>
        <CreateRoomBtnModel/>
      </div>
    </div>
  )
}

export default Sidebar
