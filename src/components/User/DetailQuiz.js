import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDataQuiz } from '../../services/apiService';

const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    const data = await getDataQuiz(quizId);
    console.log('check question:', data);
  };

  return <div>DetailQuiz</div>;
};
export default DetailQuiz;
