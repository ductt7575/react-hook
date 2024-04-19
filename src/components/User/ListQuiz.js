import { useEffect, useState } from 'react';
import { getQuizByUser } from '../../services/apiService';
import './ListQuiz.scss';
import { useNavigate } from 'react-router-dom';

const ListQuiz = (props) => {
  const [arrQuiz, setArrQuiz] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const data = await getQuizByUser();
    if (data && data.EC === 0) {
      setArrQuiz(data.DT);
    }
  };

  return (
    <div className="list-quiz-container">
      <div className="row">
        {arrQuiz &&
          arrQuiz.length > 0 &&
          arrQuiz.map((quiz, index) => {
            return (
              <div key={`${index}-quiz`} className="col-lg-3 col-md-4 col-sm-6">
                <div className="card w-100" style={{ width: '18rem' }}>
                  <img src={`data:image/jpeg;base64,${quiz.image}`} className="border card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Quiz {index + 1}</h5>
                    <p className="card-text">{quiz.description}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })}
                    >
                      Start now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        {arrQuiz && arrQuiz.length === 0 && (
          <div>
            <p>You don't have any quiz now...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListQuiz;
