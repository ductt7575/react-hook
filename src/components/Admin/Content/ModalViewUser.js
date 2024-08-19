import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import _ from "lodash";
import { useTranslation } from "react-i18next";

const ModalViewUser = (props) => {
  const { show, setShow, dataUpdate, resetUpdateData } = props;
  const { t } = useTranslation();

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setPreviewImage("");
    resetUpdateData();
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("manageUser.detail.heading")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                disabled
                type="email"
                className="form-control"
                value={email}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t("password")}</label>
              <input
                disabled
                type="password"
                className="form-control"
                value={password}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t("username")}</label>
              <input
                disabled
                type="text"
                className="form-control"
                value={username}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t("role")}</label>
              <select disabled className="form-select" value={role}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label" htmlFor="label-upload">
                {t("manageUser.detail.userImage")}
              </label>
              <input disabled type="file" id="label-upload" hidden />
            </div>

            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="previewImage" />
              ) : (
                <span>{t("previewImage")}</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewUser;
