import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  getQuizWithQA,
  postUpsertQA,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useImmer } from "use-immer";

const QuizQA = () => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [{ id: uuidv4(), description: "", isCorrect: false }],
    },
  ];
  const [questions, setQuestions] = useImmer(initQuestions);

  const [isPreviewImage, setIsPreviewImage] = useState("false");
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const { t } = useTranslation();

  useEffect(() => {
    fetchQuiz();
  }, []);

  function urlToFile(url, filename, mimeType) {
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  const fetchQuizWithQA = useCallback(async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urlToFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            "image/png"
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    }
  }, [selectedQuiz.value, setQuestions]);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [fetchQuizWithQA, selectedQuiz]);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [{ id: uuidv4(), description: "", isCorrect: false }],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      // let newQuestions = questions.filter((item) => item.id !== id);
      setQuestions(questions.filter((item) => item.id !== id));
    }
  };

  const handleAddRemoveAnswer = (type, qId, aId) => {
    if (type === "ADD") {
      const newAnswer = { id: uuidv4(), description: "", isCorrect: false };
      setQuestions((draft) => {
        let index = draft.findIndex((item) => item.id === qId);
        draft[index].answers.push(newAnswer);
      });
    }
    if (type === "REMOVE") {
      setQuestions((draft) => {
        let index = draft.findIndex((item) => item.id === qId);
        if (index > -1) {
          draft[index].answers = questions[index].answers.filter(
            (item) => item.id !== aId
          );
        }
      });
    }
  };

  const handleOnchange = (type, qId, value, aId) => {
    if (type === "QUESTION") {
      let index = questions.findIndex((item) => item.id === qId);
      setQuestions((draft) => {
        if (index > -1) {
          draft[index].description = value;
        }
      });
    }
  };

  const handleOnchangeFileQuestion = (qId, event) => {
    let index = questions.findIndex((item) => item.id === qId);
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      setQuestions((draft) => {
        draft[index].imageFile = event.target.files[0];
        // questionsClone[index].imageName = event.target.files[0].name;
        var split = event.target.files[0].name.split(".");
        var filename = split[0];
        var extension = split[1];
        if (filename.length > 15) {
          filename = filename.substring(0, 15);
        }
        draft[index].imageName = filename + "." + extension;
      });
    }
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let index = questions.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setQuestions((draft) => {
        draft[index].answers = draft[index].answers.map((answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            }

            if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        });
      });
    }
  };

  const handleSubmitQuestionForQuiz = async () => {
    //todo
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please select a quiz");
      return;
    }

    //validate question
    let isValidQuestion = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQ1 = i;
        break;
      }
    }

    if (isValidQuestion === false) {
      toast.error(`Please enter a description for Question ${indexQ1}`);
      return;
    }

    //validate answer
    let isValidAnswer = true;
    let indexQuestion = 0,
      indexAnswer = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexAnswer = j;
          break;
        }
      }
      if (isValidAnswer === false) {
        indexQuestion = i;
        break;
      }
    }

    if (isValidAnswer === false) {
      toast.error(
        `Please enter Answer ${indexAnswer + 1} at Question ${
          indexQuestion + 1
        }`
      );
      return;
    }

    let questionsClone = _.cloneDeep(questions);
    for (let i = 0; i < questionsClone.length; i++) {
      if (questionsClone[i].imageFile) {
        questionsClone[i].imageFile = await toBase64(
          questionsClone[i].imageFile
        );
      }
    }

    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionsClone,
    });

    console.log(res);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };

  return (
    <div className="questions-container">
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-3 d-block fst-italic">
            {t("manageQuestion.selectQuiz")}
          </label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
        <p className="my-3 fst-italic">
          {t("manageQuiz.update.updateQuestions")}
        </p>
        {questions.length > 0 &&
          questions &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="question-content">
                  <div className="form-floating description z-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name@example.com"
                      value={question.description}
                      onChange={(event) =>
                        handleOnchange(
                          "QUESTION",
                          question.id,
                          event.target.value,
                          ""
                        )
                      }
                    />
                    <label>
                      {t("manageQuestion.description")} {index + 1}
                    </label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={question.id}>
                      <RiImageAddFill className="label-up" />
                    </label>
                    <input
                      id={question.id}
                      type="file"
                      hidden
                      onChange={(event) =>
                        handleOnchangeFileQuestion(question.id, event)
                      }
                    />
                    {question.imageFile ? (
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handlePreviewImage(question.id)}
                      >
                        {question.imageName}
                      </span>
                    ) : (
                      <span>{t("manageQuestion.uploadImage")}</span>
                    )}
                  </div>
                  <div className="btn-add">
                    <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                      <AiOutlinePlus className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", question.id)
                        }
                      >
                        <AiOutlineMinus className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <div className="col-1 d-flex justify-content-center">
                          <input
                            className="form-check-input is-correct"
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={(event) =>
                              handleAnswerQuestion(
                                "CHECKBOX",
                                answer.id,
                                question.id,
                                event.target.checked
                              )
                            }
                          />
                        </div>
                        <div className="form-floating answer-name col-5 z-0">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            value={answer.description}
                            onChange={(event) =>
                              handleAnswerQuestion(
                                "INPUT",
                                answer.id,
                                question.id,
                                event.target.value
                              )
                            }
                          />
                          <label>
                            {t("manageQuestion.answer")} {index + 1}
                          </label>
                        </div>
                        <div className="btn-group">
                          <span
                            onClick={() =>
                              handleAddRemoveAnswer("ADD", question.id, "")
                            }
                          >
                            <AiOutlinePlus className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "REMOVE",
                                  question.id,
                                  answer.id
                                )
                              }
                            >
                              <AiOutlineMinus className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions.length === 0 && questions && (
          <div>
            <span className="text-danger">
              {t("manageQuiz.update.warning")}
            </span>
          </div>
        )}

        {questions.length > 0 && questions && (
          <div>
            <button
              onClick={() => handleSubmitQuestionForQuiz()}
              className="btn btn-warning"
            >
              {t("manageQuestion.save")}
            </button>
          </div>
        )}
        {isPreviewImage === true && (
          <Lightbox
            onClose={() => setIsPreviewImage(false)}
            image={dataImagePreview.url}
            title={dataImagePreview.title}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};

export default QuizQA;
