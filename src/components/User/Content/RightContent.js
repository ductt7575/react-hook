import CountDown from './CountDown';

const RightContent = (props) => {
  const { dataQuiz } = props;
  const onTimeUp = () => {
    props.handleFinish();
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
                <p className="question">{index + 1}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RightContent;
