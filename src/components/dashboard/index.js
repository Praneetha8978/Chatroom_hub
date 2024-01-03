import React,{useContext} from 'react'
import {Drawer,Button,Divider} from 'rsuite';
import { ProContext } from '../../context/ProfileContext';
import EditableInput from '../EditableInput';
import '../../styles/main.scss';
import {database} from '../../misc/firebase';
import {ref,set,update} from 'firebase/database';
import ProviderBlock from './ProviderBlock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AvatarUploadBtn from './AvatarUploadBtn';
import {getUserUpdate} from '../../misc/helper';

const Dashboard = ({onSignOut}) => {
  const {profile} = useContext(ProContext);
  const onSave = async (newData) => {
    try {
      const updates = await getUserUpdate(profile.uid, 'name', newData, database);
      console.log("updatesDashboard", updates);
      await update(ref(database), updates);
      toast.success('User name set successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(`Error: ${err.message}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {console.log("profile",profile)}
      <Drawer.Header>
        <Drawer.Title>
            Dashboard
        </Drawer.Title>
      </Drawer.Header>
      <Drawer.Body style={{
          margin: 0,
          padding: 0,
        }}>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock/>
        <Divider/>
        <EditableInput initialValue = {profile.name} onSave = {onSave} label = {<h6 className='mb-2'>Nickname</h6>} name = "nickname"/>
        <AvatarUploadBtn/>
        <Button block color='red' appearance='primary' style={{ position: 'absolute', bottom: '0'}} onClick={onSignOut} >
          Sign Out
        </Button>
      </Drawer.Body>
      <ToastContainer />
    </>
  )
}

export default Dashboard
