import CountDown from './CountDown';
import { useRef } from 'react';

const RightContent = (props) => {
  const refDiv = useRef([]);

  const { dataQuiz } = props;
  const onTimeUp = () => {
    props.handleFinish();
  };

  const getClassQuestion = (question) => {
    // check answered
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);
      if (isAnswered) {
        return 'question selected';
      }
    }
    return 'question';
  };

  const handleClickQuestion = (question, index) => {
    props.setIndex(index);

    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === 'question clicked') {
          item.className = 'question';
        }
      });
    }

    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => a.isSelected === true);
      if (isAnswered) {
        return;
      }
    }

    refDiv.current[index].className = 'question clicked';
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question row gx-1">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div key={`question-abc-${index}`} className="col-lg-2 col-md-4 col-6">
                <p
                  className={getClassQuestion(item, index)}
                  onClick={() => handleClickQuestion(item, index)}
                  ref={(ref) => (refDiv.current[index] = ref)}
                >
                  {index + 1}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RightContent;
