import { useState } from 'react';
import {Button,Modal} from 'react-bootstrap';

function ModalConfirmation({showModalConfirm,handleClose,handleConfirm,message}) {
 
  return (
      <Modal show={showModalConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalConfirmation;