import React, { useCallback } from 'react'
import {Button,Drawer} from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import { useModelState } from '../../misc/custom-hooks';
import { auth } from '../../misc/firebase';
import Dashboard from '.';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardToggle = () => {
  const {isOpen,close,open} = useModelState();
  const navigate = useNavigate();
  const onSignOut = useCallback(() => {
    signOut(auth)
      .then(() => {
        toast.success('Signed Out', {
          position: toast.POSITION.TOP_CENTER, // Align to the center
          autoClose: 5000, // Auto-close the alert after 5000 milliseconds (5 seconds)
        });
        navigate("/signin");
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`, {
          position: toast.POSITION.TOP_CENTER, 
          autoClose: 3000, 
        });
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
