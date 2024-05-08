import { useEffect, useState } from 'react';
import Select from 'react-select';
import './QuizQA.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from 'react-awesome-lightbox';
import { getAllQuizForAdmin, getQuizWithQA, postUpsertQA } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useImmer } from 'use-immer';
import { normalize, schema } from 'normalizr';

const QuizQA = (props) => {
  const cauHoiId = uuidv4();
  const dapAnId = uuidv4();
  const [cauHoiObj, setCauHoiObj] = useImmer({
    [cauHoiId]: {
      id: cauHoiId,
      description: '',
      imageFile: '',
      imageName: '',
      answers: [dapAnId],
    },
  });
  const [dapAnObj, setDapAnObj] = useImmer({
    [dapAnId]: { id: dapAnId, description: '', isCorrect: false },
  });

  const initQuestions = [
    {
      id: uuidv4(),
      description: '',
      imageFile: '',
      imageName: '',
      answers: [{ id: uuidv4(), description: '', isCorrect: false }],
    },
  ];

  const [questions, setQuestions] = useImmer(initQuestions);

  const [isPreviewImage, setIsPreviewImage] = useState('false');
  const [dataImagePreview, setDataImagePreview] = useState({
    title: '',
    url: '',
  });

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const { t } = useTranslation();
  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fetchQuizWithQA();
    }
  }, [selectedQuiz]);

  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }

  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      // convert base64 to file object
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png');
        }
        newQA.push(q);
      }
      setQuestions(newQA);

      //normalize data
      const answer = new schema.Entity('answer');
      const question = new schema.Entity('question', {
        answers: [answer],
      });
      const d = normalize(newQA, [question]);
      console.log('>>>> check new data:', d);
      setCauHoiObj(d.entities.question);
      setDapAnObj(d.entities.answer);
    }
  };

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
    if (type === 'ADD') {
      const cauHoiId = uuidv4();
      const dapAnId = uuidv4();

      const newQuestion = {
        id: cauHoiId,
        description: '',
        imageFile: '',
        imageName: '',
        answers: [dapAnId],
      };

      const newAnswer = {
        id: dapAnId,
        description: '',
        isCorrect: false,
      };

      setCauHoiObj((draft) => {
        draft[cauHoiId] = newQuestion;
      });

      setDapAnObj((draft) => {
        draft[dapAnId] = newAnswer;
      });
    }
    if (type === 'REMOVE') {
      if (cauHoiObj[cauHoiId]) {
        if (cauHoiObj[cauHoiId].answers && cauHoiObj[cauHoiId].answers.length > 0) {
          setDapAnObj((draft) => {
            cauHoiObj[cauHoiId].answers.forEach((item) => {
              delete draft[item];
            });
          });
        }
      }

      setCauHoiObj((draft) => {
        delete draft[id];
      });
    }
  };

  const handleAddRemoveAnswer = (type, qId, aId) => {
    if (type === 'ADD') {
      const dapAnId = uuidv4();
      const newAnswer = { id: dapAnId, description: '', isCorrect: false };
      setDapAnObj((draft) => {
        draft[dapAnId] = newAnswer;
      });

      setCauHoiObj((draft) => {
        draft[qId].answers.push(dapAnId);
      });
    }
    if (type === 'REMOVE') {
      if (cauHoiObj[qId]) {
        setCauHoiObj((draft) => {
          let newAs = cauHoiObj[qId].answers.filter((item) => item !== aId);
          draft[qId].answers = newAs;
        });
      }
      if (dapAnObj[aId]) {
        setDapAnObj((draft) => {
          delete draft[aId];
        });
      }
    }
  };

  const handleOnchange = (type, qId, value, aId) => {
    if (type === 'QUESTION') {
      if (cauHoiObj[qId]) {
        setCauHoiObj((draft) => {
          draft[qId].description = value;
        });
      }
    }
  };

  const handleOnchangeFileQuestion = (qId, event) => {
    if (cauHoiObj[qId] && event.target && event.target.files && event.target.files[0]) {
      setCauHoiObj((draft) => {
        draft[qId].imageFile = event.target.files[0];
        var split = event.target.files[0].name.split('.');
        var filename = split[0];
        var extension = split[1];
        if (filename.length > 15) {
          filename = filename.substring(0, 15);
        }
        draft[qId].imageName = filename + '.' + extension;
      });
    }
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    if (dapAnObj[answerId]) {
      setDapAnObj((draft) => {
        if (type === 'CHECKBOX') {
          draft[answerId].isCorrect = value;
        }

        if (type === 'INPUT') {
          draft[answerId].description = value;
        }
      });
    }
  };

  const handleSubmitQuestionForQuiz = async () => {
    //todo
    if (_.isEmpty(selectedQuiz)) {
      toast.error('Please select a quiz');
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
      toast.error(`Please enter Answer ${indexAnswer + 1} at Question ${indexQuestion + 1}`);
      return;
    }

    let questionsClone = _.cloneDeep(questions);
    for (let i = 0; i < questionsClone.length; i++) {
      if (questionsClone[i].imageFile) {
        questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile);
      }
    }

    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: questionsClone,
    });

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
    if (cauHoiObj[questionId]) {
      setDataImagePreview({
        url: URL.createObjectURL(cauHoiObj[questionId].imageFile),
        title: cauHoiObj[questionId].imageName,
      });
      setIsPreviewImage(true);
    }
  };

  return (
    <div className="questions-container">
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-3 d-block fst-italic">{t('manageQuestion.selectQuiz')}</label>
          <Select defaultValue={selectedQuiz} onChange={setSelectedQuiz} options={listQuiz} />
        </div>
        <p className="my-3 fst-italic">{t('manageQuestion.addQuestions')}</p>

        {Object.keys(cauHoiObj).map((keyQ, index) => {
          return (
            <div key={keyQ} className="q-main mb-4">
              <div className="question-content">
                <div className="form-floating description z-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="name@example.com"
                    value={cauHoiObj[keyQ].description}
                    onChange={(event) => handleOnchange('QUESTION', cauHoiObj[keyQ].id, event.target.value, '')}
                  />
                  <label>
                    {t('manageQuestion.description')} {index + 1}
                  </label>
                </div>
                <div className="group-upload">
                  <label htmlFor={cauHoiObj[keyQ].id}>
                    <RiImageAddFill className="label-up" />
                  </label>
                  <input
                    id={cauHoiObj[keyQ].id}
                    type="file"
                    hidden
                    onChange={(event) => handleOnchangeFileQuestion(cauHoiObj[keyQ].id, event)}
                  />
                  {cauHoiObj[keyQ].imageFile ? (
                    <span style={{ cursor: 'pointer' }} onClick={() => handlePreviewImage(cauHoiObj[keyQ].id)}>
                      {cauHoiObj[keyQ].imageName}
                    </span>
                  ) : (
                    <span>{t('manageQuestion.uploadImage')}</span>
                  )}
                </div>
                <div className="btn-add">
                  <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                    <AiOutlinePlus className="icon-add" />
                  </span>
                  {Object.keys(cauHoiObj).length > 1 && (
                    <span onClick={() => handleAddRemoveQuestion('REMOVE', cauHoiObj[keyQ].id)}>
                      <AiOutlineMinus className="icon-remove" />
                    </span>
                  )}
                </div>
              </div>
              {cauHoiObj[keyQ].answers &&
                cauHoiObj[keyQ].answers.length > 0 &&
                cauHoiObj[keyQ].answers.map((keyA, index) => {
                  return (
                    <div key={keyA} className="answers-content">
                      <div className="col-1 d-flex justify-content-center">
                        <input
                          className="form-check-input is-correct"
                          type="checkbox"
                          checked={dapAnObj[keyA].isCorrect}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              'CHECKBOX',
                              dapAnObj[keyA].id,
                              cauHoiObj[keyQ].id,
                              event.target.checked,
                            )
                          }
                        />
                      </div>
                      <div className="form-floating answer-name col-5 z-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="name@example.com"
                          value={dapAnObj[keyA].description}
                          onChange={(event) =>
                            handleAnswerQuestion('INPUT', dapAnObj[keyA].id, cauHoiObj[keyQ].id, event.target.value)
                          }
                        />
                        <label>
                          {t('manageQuestion.answer')} {index + 1}
                        </label>
                      </div>
                      <div className="btn-group">
                        <span onClick={() => handleAddRemoveAnswer('ADD', cauHoiObj[keyQ].id, '')}>
                          <AiOutlinePlus className="icon-add" />
                        </span>
                        {Object.keys(dapAnObj).length > 1 && (
                          <span onClick={() => handleAddRemoveAnswer('REMOVE', cauHoiObj[keyQ].id, dapAnObj[keyA].id)}>
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

        {questions.length > 0 && questions && (
          <div>
            <button onClick={() => handleSubmitQuestionForQuiz()} className="btn btn-warning">
              {t('manageQuestion.save')}
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
