import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService';
import { useTranslation } from 'react-i18next';

const ModalDeleteUser = (props) => {
  const { show, setShow, dataDelete, currentPage } = props;
  const { t } = useTranslation();
  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    let data = await deleteUser(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchListUsersWithPaginate(currentPage);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="md" backdrop="static" className="modal-delete-user">
        <Modal.Header closeButton>
          <Modal.Title>{t('manageUser.delete.heading')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataDelete && dataDelete.email ? (
            <>
              <p>
                <b>Email:</b> {dataDelete.email}
              </p>
              <p>
                <b>{t('username')}:</b> {dataDelete.username}
              </p>
              <p>
                <b>{t('role')}:</b> {dataDelete.role}
              </p>
              <p className="modal-delete-user__warning">{t('manageUser.delete.warning')}</p>
            </>
          ) : (
            ''
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('cancel')}
          </Button>
          <Button variant="danger" onClick={() => handleSubmitDeleteUser()}>
            {t('confirm')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
