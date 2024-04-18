import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiService';
import _ from 'lodash';

const DetailQuiz = (props) => {
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

  return <div>DetailQuiz</div>;
};
export default DetailQuiz;
