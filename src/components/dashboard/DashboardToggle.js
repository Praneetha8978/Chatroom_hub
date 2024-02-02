import React, { useCallback,useEffect } from 'react'
import {Button,Drawer} from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import { useModelState } from '../../misc/custom-hooks';
import { auth,database } from '../../misc/firebase';
import Dashboard from '.';
import { signOut } from 'firebase/auth';
import {set,ref} from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {isOfflineForDatabase} from '../../context/ProfileContext';
import {useNavigate} from 'react-router-dom';

const DashboardToggle = () => {
  const {isOpen,close,open} = useModelState();
  const navigate = useNavigate();
  const updateStatus = () => {
    const userStatusRef = ref(database, `/status/${auth.currentUser.uid}`);
    return set(userStatusRef, isOfflineForDatabase);
  };  
  const onSignOut = useCallback(() => {
    const userStatusRef = ref(database, `/status/${auth.currentUser.uid}`);
    set(userStatusRef, isOfflineForDatabase).then(() => signOut(auth))
    .then(() => {
      toast.success('Signed Out', {
        position: toast.POSITION.TOP_CENTER, // Align to the center
        autoClose: 5000, // Auto-close the alert after 5000 milliseconds (5 seconds)
      });
      navigate("/signin");
      close();
    })
    .catch((error) => toast.error(`Error: ${error.message}`, {
      position: toast.POSITION.TOP_CENTER, 
      autoClose: 3000, 
    }));
    
  }, [close]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      updateStatus();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [updateStatus]);
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
