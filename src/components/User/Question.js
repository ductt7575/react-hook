import _ from 'lodash';

const Question = (props) => {
  const { data, index, handleCheckBox } = props;
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleHandleCheckBox = (aId, qId) => {
    handleCheckBox(aId, qId);
  };

  return (
    <>
      {data.image ? (
        <div className="question-img">
          <img src={`data:image/jpeg;base64,${data.image}`} />
        </div>
      ) : (
        <div className="question-img"></div>
      )}
      <div className="question mt-3 ms-4">
        Question {index + 1}: {data.questionDescription} ?
      </div>
      <div className="answer mt-3 ms-5">
        {data.answers &&
          data.answers.length &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    onChange={() => handleHandleCheckBox(a.id, data.questionId)}
                  />
                  <label className="form-check-label user-select-none">{a.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;