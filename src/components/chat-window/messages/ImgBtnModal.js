import React from 'react'
import { useModelState } from '../../../misc/custom-hooks'
import { Modal,Input } from 'rsuite';

const ImgBtnModal = ({src,fileName}) => {
    const {isOpen,open,close} = useModelState();
  return (
    <>
     <input type = "image" src = {src} alt = "file" onClick = {open} loading = "lazy" className="mw-100 mh-100 w-auto img-b "/>
     <Modal open = {isOpen} onClose = {close}>
        <Modal.Header>
            <Modal.Title>{fileName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <img src = {src} height = "100%" width = "100%" alt = "file" className = "mt-3" />
            </div>
        </Modal.Body>
        <Modal.Footer>
            <a href = {src} target = "_blank" rel = "noopener noreferrer" >
                View original
            </a>
        </Modal.Footer>
     </Modal>
    </>
  )
}

export default ImgBtnModal;
