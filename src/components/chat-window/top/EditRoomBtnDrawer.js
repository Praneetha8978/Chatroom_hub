import React,{memo} from 'react';
import {useParams} from 'react-router-dom';
import {Button,Drawer} from 'rsuite';
import { useModelState } from '../../../misc/custom-hooks';
import EditableInput from '../../EditableInput';
import { useCurrentRoom } from '../../../context/current-room.context';
import {database} from '../../../misc/firebase';
import {ref,set} from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';

const EditRoomBtnDrawer = () => {
    const {isOpen,open,close} = useModelState();
    const {chatId} = useParams();
    const name = useCurrentRoom(v => v.name);
    const description = useCurrentRoom(v => v.description);
    const updateData = (key,value) => {
        const chatRef = ref(database, `rooms/${chatId}/${key}`);
        set(chatRef, value).then(() => {
            toast.success("Successfully Updated", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
              });
        }).catch((error) => {
            toast.error(`Error${error.message}`, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 4000,
              });
        });
    }
    const onNameSave = (newName) => {
        updateData('name',newName);
    }
    const onDescriptionSave = (newDesc) => {
        updateData('description',newDesc);
    }
  return (
    <div>
      <Button className='br-circle' size='sm' color='red' appearance='primary' onClick={open}>
        A
      </Button>
      <Drawer open = {isOpen} onClose = {close} placement='right'>
        <Drawer.Header>
            <Drawer.Title>
                Edit Room
            </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body style={{margin:0,padding: 0,marginTop:5}}>
            <EditableInput initialValue = {name} onSave={onNameSave} label={<h6 className='mb-2'>Name</h6>} emptyMsg='Name cannot be empty'/>
            <EditableInput as = "textarea" rows = {5} initialValue = {description} onSave = {onDescriptionSave} emptyMsg='Description cannot be empty' wrapperClassName='mt-3'/>
            <Button block style={{ position: 'absolute', bottom: '0'}} onClick = {close}>
                Close
            </Button>
        </Drawer.Body>
      </Drawer>
      <ToastContainer/>
    </div>
  )
}

export default memo(EditRoomBtnDrawer);
