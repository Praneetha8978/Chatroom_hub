import React,{memo} from 'react'
import { useCurrentRoom } from '../../../context/current-room.context'
import ArrowLeftIcon from '@rsuite/icons/ArrowLeft';
import { Link } from 'react-router-dom';
import { ButtonToolbar } from 'rsuite';
import '../../../styles/main.scss';
import RoomInfoBtnModel from './RoomInfoBtnModel';

const Top = () => {
  const name = useCurrentRoom(v => v.name);
  const isMobile = window.innerWidth <= 767
  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h4>
          <Link to="/" className={isMobile ? 'd-inline-block p-0 mr-2 text-blue link-unstyled':'d-none'}><ArrowLeftIcon color='blue'/></Link>
          <span className='text-disappear'>{name}</span>
        </h4>
        <ButtonToolbar>
          <span>todo</span>
        </ButtonToolbar>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <span>todo</span>
        <RoomInfoBtnModel/>
      </div>
    </div>
  )
}

export default memo(Top);
