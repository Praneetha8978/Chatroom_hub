import React, { useCallback } from 'react'
import {Button,Drawer} from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import { useModelState } from '../misc/custom-hooks';
import { auth } from '../misc/firebase';
import Dashboard from '.';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const DashboardToggle = () => {
  const {isOpen,close,open} = useModelState();
  const navigate = useNavigate();
  const onSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        navigate("/signin");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  }, [navigate,close]);
  return (
    <>      
      <Button block color='blue' appearance='primary' startIcon={<DashboardIcon/>} onClick={open}>
            Dashboard
      </Button>

      <Drawer open = {isOpen} onClose = {close} placement='left'  backdrop>
        <Dashboard onSignOut = {onSignOut}/>
      </Drawer>
    </>
  )
}

export default DashboardToggle
