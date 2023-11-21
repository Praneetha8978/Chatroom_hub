import React, { useCallback, useState } from 'react'
import {Input,InputGroup} from 'rsuite';
import EditIcon from '@rsuite/icons/Edit';
import CloseIcon from '@rsuite/icons/Close';
import CheckIcon from '@rsuite/icons/Check';

const EditableInput = ({initialValue,onSave,label = null,placeholder = "Write Your name",emptyMsg = "Input is empty",...inputProps}) => {
  const [input,setInput] = useState(initialValue);
  const [isEditable,setIsEditable] = useState(false);

  const onInputChange = useCallback((value)=>{
    setInput(value);
  },[]);
  
  const onEditClick = useCallback(()=>{
    console.log("called");
    setIsEditable(p => !p);
    setInput(initialValue);
  },[initialValue]);

  const onSaveClick = async() => {
    const trimmed = input.trim();
    if(trimmed === ''){
        alert(emptyMsg);
    }
    
    if(trimmed != initialValue){
        await onSave(trimmed);
    }
    
    setIsEditable(false);
  }

  return (
    <div>
      {label}
      <InputGroup>
        <Input {...inputProps} disabled = {!isEditable} placeholder={placeholder} value = {input} onChange={onInputChange}/>
        <InputGroup.Button onClick={onEditClick}>
            {
                isEditable ? <CloseIcon /> : <EditIcon />
            }
        </InputGroup.Button>
        {isEditable && 
        <InputGroup.Button onClick={onSaveClick}>
            <CheckIcon/>
        </InputGroup.Button>}
      </InputGroup>
    </div>
  )
}

export default EditableInput
