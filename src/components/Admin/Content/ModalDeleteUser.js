import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { deleteDeleteUser } from '../../../services/apiService';

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = () => {
    alert('abc');
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" backdrop="static" className="modal-delete-user">
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to delete this user?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataDelete && dataDelete.email ? (
            <>
              <p>
                <b>Email:</b> {dataDelete.email}
              </p>
              <p>
                <b>Username:</b> {dataDelete.username}
              </p>
              <p>
                <b>Role:</b> {dataDelete.role}
              </p>
              <p className="modal-delete-user__warning">*Warning: By deleting this user you can't undo this action!</p>
            </>
          ) : (
            ''
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
