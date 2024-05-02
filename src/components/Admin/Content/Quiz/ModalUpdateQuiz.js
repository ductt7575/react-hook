import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../../services/apiService';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdateQuiz, resetUpdateDataQuiz, fetchQuiz } = props;

  const handleClose = () => {
    setShow(false);
    setName('');
    setDescription('');
    setType('');
    setImage('');
    setPreviewImage('');
    resetUpdateDataQuiz();
  };

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    if (!_.isEmpty(dataUpdateQuiz)) {
      setName(dataUpdateQuiz.name);
      setDescription(dataUpdateQuiz.description);
      setType(dataUpdateQuiz.difficulty);
      setImage('');
      if (dataUpdateQuiz.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
      }
    }
  }, [dataUpdateQuiz]);

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      // setPreviewImage("");
    }
  };

  const handleSubmitUpdateQuiz = async () => {
    if (!name) {
      toast.error('Invalid name');
      return;
    }

    if (!description) {
      toast.error('Invalid description');
      return;
    }
    let data = await putUpdateQuizForAdmin(dataUpdateQuiz.id, description, name, type, image);
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
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className="modal-add-user">
        <Modal.Header closeButton>
          <Modal.Title>{t('manageQuiz.listQuiz.modalEdit.heading')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">
                {t('manageQuiz.name')} <span className="text-danger">(*)</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                {t('manageQuiz.description')} <span className="text-danger">(*)</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t('manageQuiz.difficulty')}</label>
              <select className="form-select" onChange={(event) => setType(event.target.value)} value={type}>
                <option value="Not Selected">Select Difficulty</option>
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus /> {t('manageQuiz.listQuiz.modalEdit.uploadImage')}
              </label>
              <input type="file" id="labelUpload" hidden onChange={(event) => handleUploadImage(event)} />
            </div>

            <div className="col-md-12 img-preview">
              {previewImage ? <img src={previewImage} /> : <span>Preview Image</span>}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('close')}
          </Button>
          <Button variant="warning" onClick={() => handleSubmitUpdateQuiz()}>
            {t('save')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
