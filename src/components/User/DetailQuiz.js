import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getDataQuiz, postSubmitQuiz } from '../../services/apiService';
import _ from 'lodash';
import './DetailQuiz.scss';
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './Content/RightContent';

const DetailQuiz = (props) => {
  const location = useLocation();
  const params = useParams();
  const quizId = params.id;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);

  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    const res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy('id')
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuiz(data);
    }
  };

  const handlePrev = () => {
    if (index - 1 < 0) {
      return;
    }
    setIndex(index - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) {
      setIndex(index + 1);
    }
  };

  const handleFinish = async () => {
    console.log('check datta beffore suit:', dataQuiz);
    let payload = {
      quizId: +quizId,
      answers: [],
    };

    let answers = [];

    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = +question.questionId;
        let userAnswerId = [];

        question.answers.forEach((a) => {
          if (a.isSelected) {
            userAnswerId.push(a.id);
          }
        });

        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });

      payload.answers = answers;

      //Call api submit method
      let res = await postSubmitQuiz(payload);
      console.log('check submitted:', res);
      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        alert(res.EM);
      }
    }
  };

  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find((item) => +item.questionId === +questionId);
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });

      let index = dataQuizClone.findIndex((item) => +item.questionId === +questionId);
      if (index > -1) {
        dataQuizClone[index] = question;
        setDataQuiz(dataQuizClone);
      }
    }
  };

  return (
    <div className="container detail-quiz-container">
      <div className="left-content">
        <h3 className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </h3>
        <div className="separate"></div>
        <div className="question-content">
          <Question
            handleCheckBox={handleCheckBox}
            index={index}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="controls mt-4">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={() => handleNext()}>
            Next
          </button>
          <button className="btn btn-warning" onClick={() => handleFinish()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-content">
        <RightContent dataQuiz={dataQuiz} handleFinish={handleFinish} setIndex={setIndex} />
      </div>
      <ModalResult show={isShowModalResult} setShow={setIsShowModalResult} dataModalResult={dataModalResult} />
    </div>
  );
};
export default DetailQuiz;
