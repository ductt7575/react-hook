import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService';

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchListUsers();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
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
