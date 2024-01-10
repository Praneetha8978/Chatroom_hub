import React, { useCallback, useState } from 'react';
import { InputGroup } from 'rsuite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { ReactMic } from 'react-mic';
import {storage} from '../../../misc/firebase';
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import { useParams } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';


const AudioMsgBtn = ({afterUpload}) => {
  const {chatId} = useParams();
  const [isRecording,setIsRecording] = useState(false);
  const [isUploading,setIsUploading] = useState(false);
  const onUpload = useCallback(async(data)=>{
    setIsUploading(true);
    try{
        const storageRef = ref(storage, `chatId/${chatId}/audio_${Date.now()}.mp3`);
            const metadata = {
                cacheControl: `public,max-age=${3600*24*3}`,
            };

            const snap = await uploadBytes(storageRef, data.blob, metadata);
            const file = {
                contentType : snap.metadata.contentType,
                name : snap.metadata.name,
                url : await getDownloadURL(snap.ref),
            }
            setIsUploading(false);
            afterUpload([file]);
    }catch(err){
        setIsUploading(false);
        toast.error(err.message, {
            position: toast.POSITION.TOP_CENTER, // Align to the center
            autoClose: 4000, // Auto-close the alert after 5000 milliseconds (5 seconds)
          });
    }
  },[afterUpload,chatId])
  const onClick = useCallback(()=>{
    setIsRecording(p => !p);
  },[]);
  return (
    <InputGroup.Button onClick={onClick} disabled = {isUploading} className={isRecording ? 'animate-blink' : ''}>
        <FontAwesomeIcon icon={faMicrophone} />
        <ReactMic
          record = {isRecording}
          className = "d-none"
          onStop = {onUpload}
          mimeType = "audio/mp3"
        />
    </InputGroup.Button>
  )
}

export default AudioMsgBtn
