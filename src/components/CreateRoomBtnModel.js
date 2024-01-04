import React,{useCallback, useRef, useState} from 'react'
import {Button,Modal,Form,Input,Schema} from 'rsuite';
import CreativeIcon from '@rsuite/icons/Creative';
import { useModelState } from '../misc/custom-hooks';
import '../styles/main.scss';
import { serverTimestamp,ref,push,set } from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, database } from '../misc/firebase';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const INITIAL_FORM = {
    name : "",
    description : ""
}

const {StringType} = Schema.Types;

const model = Schema.Model({
    name : StringType().isRequired("Chat name is required"),
    description : StringType().isRequired("Description is required")
})

const CreateRoomBtnModel = () => {
  
  const {isOpen,open,close} = useModelState();
  const [formValue,setFormValue] = useState(INITIAL_FORM);
  const [isLoading,setIsLoading] = useState(false);
  const formRef = useRef();
  const onFormChange = useCallback((value) => {
    setFormValue(value);
  },[]);
  const onSubmit = async() => {
    if(!formRef.current.check()){
        return;
    }
    setIsLoading(true);
    const newRoomdata = {
        ...formValue,
        createdAt : serverTimestamp(),
        admins : {
          [auth.currentUser.uid] : true,
        }
    }
    try{
        const roomsRef = await ref(database, 'rooms');
        const newRoomRef = push(roomsRef);
        await set(newRoomRef, newRoomdata);

        toast.info(`${formValue.name} has been created`, {
            position: toast.POSITION.TOP_CENTER, 
            autoClose: 3000, 
          });
        
        setIsLoading(false);
        setFormValue(INITIAL_FORM);
        close();
        

    }catch(error){
        setIsLoading(false);
        toast.error(`Error: ${error.message}`, {
            position: toast.POSITION.TOP_CENTER, 
            autoClose: 3000, 
          });
    }
  }
  return (
    <div className='mt-1'>
      <Button block color='green' appearance='primary' onClick = {open}>
        <CreativeIcon/> Create new chat room
      </Button>
      <Modal open = {isOpen} onClose = {close}>
        <Modal.Header>
            <Modal.Title>
                New chat room
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form fluid onChange =  {onFormChange} formValue = {formValue} model = {model} ref={formRef}>
                <Form.Group>
                    <Form.ControlLabel>Room name</Form.ControlLabel>
                    <Form.Control name = "name" placeholder = 'Enter chat room name.....'></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Description</Form.ControlLabel>
                    <Form.Control rows={5} name="description" accepter={Textarea} placeholder = 'Enter room description'></Form.Control>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button block appearance='primary' onClick = {onSubmit} disabled = {isLoading}>
                Create new chat room
            </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default CreateRoomBtnModel
