import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalResult = (props) => {
  const { show, setShow, dataModalResult } = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="md" backdrop="static" className="modal-delete-user">
        <Modal.Header closeButton>
          <Modal.Title>Your result...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Questions: <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            Total Correct answer:{' '}
            <b>
              {dataModalResult.countCorrect}/{dataModalResult.countTotal}
            </b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Show answer
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
