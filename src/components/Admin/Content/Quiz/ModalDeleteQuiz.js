import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { deleteQuizForAdmin } from '../../../../services/apiService';
import { useTranslation } from 'react-i18next';

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDeleteQuiz, fetchQuiz } = props;

  const handleClose = () => setShow(false);
  const { t } = useTranslation();

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
          <Modal.Title>{t('manageQuiz.listQuiz.modalDelete.heading')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataDeleteQuiz && dataDeleteQuiz.id ? (
            <>
              <p>
                <b>Id:</b> {dataDeleteQuiz.id}
              </p>
              <p>
                <b>{t('manageQuiz.name')}:</b> {dataDeleteQuiz.name}
              </p>
              <p>
                <b>{t('manageQuiz.description')}:</b> {dataDeleteQuiz.description}
              </p>
              <p>
                <b>{t('manageQuiz.difficulty')}:</b> {dataDeleteQuiz.difficulty}
              </p>
              <p className="modal-delete-user__warning">{t('manageQuiz.listQuiz.modalDelete.warning')}</p>
            </>
          ) : (
            ''
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button variant="danger" onClick={() => handleSubmitDeleteQuiz()}>
            {t('confirm')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
