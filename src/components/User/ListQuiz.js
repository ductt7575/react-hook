import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ListQuiz = (props) => {
  const [arrQuiz, setArrQuiz] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <div className="row gy-4">
        {arrQuiz &&
          arrQuiz.length > 0 &&
          arrQuiz.map((quiz, index) => {
            return (
              <div key={`${index}-quiz`} className="col-lg-3 col-md-4 col-sm-6">
                <div className="card w-100" style={{ height: "430px" }}>
                  <img
                    src={`data:image/jpeg;base64,${quiz.image}`}
                    className="border card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {t("listQuiz.quiz")} {index + 1}
                    </h5>
                    <p className="card-text" style={{ height: "50px" }}>
                      {quiz.description}
                    </p>
                    <button
                      className="btn btn-primary t-auto"
                      onClick={() =>
                        navigate(`/quiz/${quiz.id}`, {
                          state: { quizTitle: quiz.description },
                        })
                      }
                    >
                      {t("listQuiz.btnStart")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        {arrQuiz && arrQuiz.length === 0 && (
          <div>
            <p>{t("listQuiz.noQuiz")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListQuiz;
