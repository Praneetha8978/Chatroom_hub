import React,{useState} from 'react'
import '../../styles/main.scss';
import {Modal,Button} from 'rsuite';
import {useModelState} from '../../misc/custom-hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AvatarEditor from 'react-avatar-editor'

const fileInputTypes = ".png, .jpeg, .jpg";
const acceptedFileTypes = ['image/png','image/jpeg','image/pjpeg']
const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const AvatarUploadBtn = () => {
  const {isOpen,open,close} = useModelState();
  const [image,setImage] = useState(null);

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
            <Button appearance='ghost' block>Upload new avatar</Button>
          </Modal.Footer>
        </Modal>
       </div>
       <ToastContainer />
    </div>
  )
}

export default AvatarUploadBtn
