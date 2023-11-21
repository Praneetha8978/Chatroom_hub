import React,{useContext} from 'react'
import {Drawer,Button} from 'rsuite';
import { ProContext } from '../context/ProfileContext';


const Dashboard = ({onSignOut}) => {
  const {profile} = useContext(ProContext);

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
        <Button block color='red' appearance='primary' style={{ position: 'absolute', bottom: '0'}} onClick={onSignOut} >
          Sign Out
        </Button>
      </Drawer.Body>
      
    </>
  )
}

export default Dashboard
