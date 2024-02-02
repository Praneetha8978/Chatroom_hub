import React,{useState} from 'react';
import {auth} from '../../misc/firebase';
import {Tag,Button} from 'rsuite';
import { FaGoogle } from 'react-icons/fa';
import { GoogleAuthProvider,FacebookAuthProvider,linkWithPopup,unlink} from 'firebase/auth';
import FacebookOfficialIcon from '@rsuite/icons/legacy/FacebookOfficial';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProviderBlock = () => {
  const [isConnected,setIsConnected] = useState({
    'google.com' : auth.currentUser.providerData.some(data => data.providerId === 'google.com'),
    'facebook.com' : auth.currentUser.providerData.some(data => data.providerId === 'facebook.com')
  })

  const updateIsConnected = (providerId,value) => {
    setIsConnected(p => {
        return {
            ...p,
            [providerId] : value
        }
    })
  }
//   console.log("uid"+" "+auth.currentUser.providerData[0].providerId);
    const unlinking = async(providerId) => {
        try{
            if(auth.currentUser.providerData.length === 1){
                throw new Error(`You can not disconnect from ${providerId}`)
            }

            await unlink(auth.currentUser, providerId);
            updateIsConnected(providerId,false);
            toast.success(`disconnected from ${providerId}`, {
                position: toast.POSITION.TOP_CENTER, 
                autoClose: 3000,
              });

        }catch(error){
            toast.error(`Error: ${error.message}`, {
                position: toast.POSITION.TOP_CENTER, 
                autoClose: 3000, 
              });
        }
    }
    const unlinkGoogle = () => {
        unlinking('google.com');
    }
    const unlinkFacebook = () => {
        unlinking('facebook.com');
    }
    const link = async(provider) => {
        try{
            await linkWithPopup(auth.currentUser, provider);
            toast.success(`Linked to ${provider.providerId}`, {
                position: toast.POSITION.TOP_CENTER, 
                autoClose: 3000,
              });
            updateIsConnected(provider.providerId,true);
        }catch(error){
            toast.error(`Error: ${error.message}`, {
                position: toast.POSITION.TOP_CENTER, 
                autoClose: 3000, 
              });
        }
    }
    const linkGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        link(googleProvider);
    }
    const linkFacebook = () => {
        const facebookProvider = new FacebookAuthProvider();
        link(facebookProvider);
    }
  return (
    <div>
      {
        isConnected["google.com"] && 
        <Tag color='green' closable onClose={unlinkGoogle}>
            <FaGoogle/> Connected
        </Tag>
      }
      {
        isConnected["facebook.com"] &&
        <Tag color='blue' closable onClose={unlinkFacebook}>
            <FacebookOfficialIcon/> Connected
        </Tag>
      }
      <div className='mt-2'>
        {
            !isConnected["google.com"] &&
            <Button block color='green' appearance='primary' onClick={linkGoogle}>
                <FaGoogle/> Link To Google
            </Button>
        }
        {
            !isConnected["facebook.com"] &&
            <Button block color='blue' appearance='primary' onClick={linkFacebook}>
                <FacebookOfficialIcon/> Link To Facebook
            </Button>
        }
      </div>
    </div>
  )
}

export default ProviderBlock
