import { useState, useEffect } from "react";
import Select from "react-select";
import "./ManageQuiz.scss";
import { toast } from "react-toastify";
import {
  getAllQuizForAdmin,
  postCreateNewQuiz,
} from "../../../../services/apiService";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import { AiOutlinePlus } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { MdUpdate, MdOutlineAssignmentTurnedIn } from "react-icons/md";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";
import { useTranslation } from "react-i18next";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const { t } = useTranslation();

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitQuiz = async (event) => {
    //validate
    if (!name || !description) {
      toast.error("Name/Description is required");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setType("");
      setImage(null);
      fetchQuiz();
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  return (
    <div className="quiz-container">
      <div className="title mb-3">{t("manageQuiz.heading")}</div>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <AiOutlinePlus
              style={{
                marginRight: "8px",
              }}
            />
            {t("manageQuiz.createNew.heading")}
          </Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              {/* <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">Add new quiz</legend> */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control col-md-6"
                  placeholder=""
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <label>
                  {t("manageQuiz.name")}{" "}
                  <span className="text-danger">(*)</span>
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <label>
                  {t("manageQuiz.description")}{" "}
                  <span className="text-danger">(*)</span>
                </label>
              </div>
              <div className="mb-3">
                <Select
                  defaultValue={type}
                  onChange={setType}
                  options={options}
                  placeholder={t("manageQuiz.difficulty")}
                />
              </div>
              <div className="col-md-12  mb-3">
                <input
                  type="file"
                  id="label-upload"
                  hidden
                  onChange={(event) => handleChangeFile(event)}
                />
              </div>
              <div className="col-md-12 img-preview">
                <label
                  className="form-label label-upload "
                  htmlFor="label-upload"
                >
                  {previewImage ? (
                    <img src={previewImage} alt="previewImage" />
                  ) : (
                    <span>{t("manageQuiz.createNew.chooseImage")}</span>
                  )}
                </label>
              </div>
              <div>
                <button
                  className="btn btn-warning mt-4"
                  onClick={(event) => handleSubmitQuiz(event)}
                >
                  {t("manageQuiz.createNew.btnAdd")}
                </button>
              </div>
              {/* </fieldset> */}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="list-detail">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <BsList
                style={{
                  marginRight: "8px",
                }}
              />
              {t("manageQuiz.listQuiz.heading")}
            </Accordion.Header>
            <Accordion.Body>
              <TableQuiz
                fetchQuiz={fetchQuiz}
                listQuiz={listQuiz}
                options={options}
              />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <MdUpdate
                style={{
                  marginRight: "8px",
                }}
              />
              {t("manageQuiz.update.heading")}
            </Accordion.Header>
            <Accordion.Body>
              <QuizQA />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <MdOutlineAssignmentTurnedIn
                style={{
                  marginRight: "8px",
                }}
              />
              {t("manageQuiz.assign.heading")}
            </Accordion.Header>
            <Accordion.Body>
              <AssignQuiz />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default ManageQuiz;
