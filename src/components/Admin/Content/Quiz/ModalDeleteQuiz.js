import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { deleteQuizForAdmin } from '../../../../services/apiService';

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDeleteQuiz, fetchQuiz } = props;

  const handleClose = () => setShow(false);

  const handleSubmitDeleteQuiz = async () => {
    let data = await deleteQuizForAdmin(dataDeleteQuiz.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="md" backdrop="static" className="modal-delete-user">
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to delete this quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataDeleteQuiz && dataDeleteQuiz.id ? (
            <>
              <p>
                <b>Id:</b> {dataDeleteQuiz.id}
              </p>
              <p>
                <b>Name:</b> {dataDeleteQuiz.name}
              </p>
              <p>
                <b>Description:</b> {dataDeleteQuiz.description}
              </p>
              <p>
                <b>Difficulty:</b> {dataDeleteQuiz.difficulty}
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
          <Button variant="danger" onClick={() => handleSubmitDeleteQuiz()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
