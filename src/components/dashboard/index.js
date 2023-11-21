import React,{useContext} from 'react'
import {Drawer,Button,Divider} from 'rsuite';
import { ProContext } from '../../context/ProfileContext';
import EditableInput from '../EditableInput';
import '../../styles/main.scss';
import {database} from '../../misc/firebase';
import {ref,set} from 'firebase/database';

const Dashboard = ({onSignOut}) => {
  const {profile} = useContext(ProContext);
  const onSave = async(newData) => {
    const userRef = ref(database, `/profiles/${profile.uid}/name`);
    set(userRef, newData)
    .then(() => {
      console.log('User name set successfully');
    })
    .catch((error) => {
      console.error('Error setting user name:', error.message);
    });
  }

  return (
    <>
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
        <Divider/>
        <EditableInput initialValue = {profile.name} onSave = {onSave} label = {<h6 className='mb-2'>Nickname</h6>} name = "nickname"/>
        <Button block color='red' appearance='primary' style={{ position: 'absolute', bottom: '0'}} onClick={onSignOut} >
          Sign Out
        </Button>
      </Drawer.Body>
      
    </>
  )
}

export default Dashboard
