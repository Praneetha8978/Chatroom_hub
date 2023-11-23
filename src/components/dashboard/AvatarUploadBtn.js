import React,{useState,useRef,useContext} from 'react'
import '../../styles/main.scss';
import {Modal,Button} from 'rsuite';
import {useModelState} from '../../misc/custom-hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AvatarEditor from 'react-avatar-editor';
import {storage,database} from '../../misc/firebase';
import {ref as databaseRef,set} from 'firebase/database';
import {ref as storageRef,uploadBytes,getDownloadURL} from 'firebase/storage';
import { ProContext } from '../../context/ProfileContext';


const fileInputTypes = ".png, .jpeg, .jpg";
const acceptedFileTypes = ['image/png','image/jpeg','image/pjpeg']
const isValidFile = (file) => acceptedFileTypes.includes(file.type);
const getBlob = (canvas) => {
  return new Promise((resolve,reject)=>{
    canvas.toBlob((blob)=>{
      if(blob){
        resolve(blob);
      }
      else{
        reject(new Error('File process error'));
      }
    })
  })
}
const AvatarUploadBtn = () => {
  const {isOpen,open,close} = useModelState();
  const [image,setImage] = useState(null);
  const avatarEditorRef = useRef();
  const {profile} = useContext(ProContext);
  const [isLoading,setIsLoading] = useState(false);

  const onFileInputChange = (event) => {
    const currentFiles = event.target.files;
    if(currentFiles.length === 1){
      const file = currentFiles[0];
      if(isValidFile(file)){
        setImage(file);
        open();
      }else{
        toast.warning(`Wrong file type ${file.type}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    }
  }
  const onUploadClick = async() =>{
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    setIsLoading(true);
    try{
      const blob = await getBlob(canvas);
      const avatarFileRef = storageRef(storage,`/profiles/${profile.uid}/avatar`);
      const uploadAvatarResult = await uploadBytes(avatarFileRef,blob,{
        cacheControl : `public,max-age=${3600*24*3}`
      });
      await uploadAvatarResult;
      const downloadUrl = await getDownloadURL(avatarFileRef);
      const userAvatarRef = databaseRef(database, `/profiles/${profile.uid}/avatar`);
      await set(userAvatarRef, downloadUrl);
      setIsLoading(false);
      toast.success('Avatar has been uploaded', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
       
    }catch(err){
      setIsLoading(false);
      toast.error(`Error: ${err.message}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  }
  return (
    <div className='mt-3 text-center'>
       <div>
        <label htmlFor='avatar-upload' className='d-block cursor-pointer padded'>
          Select new avatar
          <input id='avatar-upload' type="file" className='d-none' accept={fileInputTypes} onChange={onFileInputChange}/>
        </label>
        <Modal open={isOpen} onClose={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='d-flex justify-content-center align-items-center h-100'>
              {
                image && 
                <AvatarEditor
                  ref = {avatarEditorRef}
                  image={image}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button appearance='ghost' block onClick = {onUploadClick} disabled = {isLoading}>Upload new avatar</Button>
          </Modal.Footer>
        </Modal>
       </div>
       <ToastContainer />
    </div>
  )
}

export default AvatarUploadBtn
