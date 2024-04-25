const RightContent = (props) => {
  const { dataQuiz } = props;
  console.log(dataQuiz);
  return (
    <>
      <div className="main-timer">10:10</div>
      <div className="main-question row gx-1">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div className="col-lg-2 col-md-4 col-6">
                <p className="question">{index + 1}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RightContent;
