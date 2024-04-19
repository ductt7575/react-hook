import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiService';
import _ from 'lodash';
import './DetailQuiz.scss';

const DetailQuiz = (props) => {
  const location = useLocation();
  const { email } = props;
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    const res = await getDataQuiz(quizId);
    console.log('check question:', res);
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
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      console.log(data);
    }
  };

  return (
    <div className="container detail-quiz-container">
      <div className="left-content">
        <h3 className="title">
          Quiz {quizId}: {location?.state?.quizTitle}
        </h3>
        <img className="question-img" src="" />
        <div className="question-content">
          <div className="question">Question 1: What is your name?</div>
          <div className="answer mt-3">
            <p className="a-child">A. ádasdasd</p>
            <p className="a-child">B. ádasdasd</p>
            <p className="a-child">C. ádasdasd</p>
          </div>
        </div>
        <div className="controls">
          <button className="btn btn-primary">Prev</button>
          <button className="btn btn-primary">Next</button>
        </div>
      </div>
      <div className="right-content">Countdown</div>
    </div>
  );
};
export default DetailQuiz;
