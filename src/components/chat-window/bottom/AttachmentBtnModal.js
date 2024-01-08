import React,{useState} from 'react';
import { InputGroup,Modal,Button,Uploader } from 'rsuite';
import AttachmentIcon from '@rsuite/icons/Attachment';
import { useModelState } from '../../../misc/custom-hooks';
import {storage} from '../../../misc/firebase';
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const MAX_FILE_SIZE = 1000*1024*5;

const AttachmentBtnModal = ({afterUpload}) => {
  const {chatId} = useParams();
  const {isOpen,close,open} = useModelState();
  const [fileList,setFileList] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  

  const onChange = (fileArr) => {
     const filtered = fileArr.filter(el => el.blobFile.size <= MAX_FILE_SIZE).slice(0,5);
     setFileList(filtered);
  }
  const onUpload = async () => {
    try{
        const uploadPromises = fileList.map(f => {
            const storageRef = ref(storage, `chatId/${chatId}/${Date.now() + f.name}`);
            const metadata = {
                cacheControl: 'public,max-age=' + (3600 * 24 * 3),
            };

            return uploadBytes(storageRef, f.blobfile, metadata);
        })
        console.log("uploadPromises"+uploadPromises);
        const uploadSnapshots = await Promise.all(uploadPromises);
        const shapePromises = uploadSnapshots.map(async snap => {
            return{
                contentType : snap.metadata.contentType,
                name : snap.metadata.name,
                url : await getDownloadURL(snap.ref)
            }
        })

        const files = await Promise.all(shapePromises);
        await afterUpload(files);
        setIsLoading(files);
        close();
    }catch(err){
        setIsLoading(false);
        toast.error(err.message, {
            position: toast.POSITION.TOP_CENTER, // Align to the center
            autoClose: 4000, // Auto-close the alert after 5000 milliseconds (5 seconds)
          });
    }
  }

  return (
    <>
      <InputGroup.Button onClick={open}>
          <AttachmentIcon/>
      </InputGroup.Button>
      <Modal open = {isOpen} onClose = {close}>
        <Modal.Header>
            <Modal.Title>Upload files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Uploader
                autoUpload={false}
                action=""
                fileList={fileList}
                onChange={onChange}
                multiple
                listType="picture-text"
                className='w-100'
                disabled = {isLoading}
            />
        </Modal.Body>
        <Modal.Footer>
            <Button block disabled={isLoading} onClick={onUpload}>
                Send to chat
            </Button>
            <div className='text-right mt-2'>
                <small>* only files less than 5 mb are allowed</small>
            </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AttachmentBtnModal
