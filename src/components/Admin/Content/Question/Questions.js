import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
const Questions = (props) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});
  return (
    <div className="questions-container">
      <div className="title">Question Management</div>
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-3 d-block">Select quiz: </label>
          <Select onChange={setSelectedQuiz} options={options} />
        </div>
        <p className="my-3">Add questions</p>
        <div>
          <div className="question-content">
            <div className="form-floating description">
              <input type="text" className="form-control" placeholder="name@example.com" />
              <label>Description</label>
            </div>
            <div className="group-upload">
              <label>Upload Image</label>
              <input type="file" hidden />
              <span>0 file is uploaded</span>
            </div>
            <div className="btn-add">
              <span>
                <AiOutlinePlus className="icon-add" />
                <AiOutlineMinus className="icon-remove" />
              </span>
            </div>
          </div>
          <div className="answers-content">
            <div className="col-1 d-flex justify-content-center">
              <input className="form-check-input is-correct" type="checkbox" />
            </div>
            <div className="form-floating answer-name col-5">
              <input type="text" className="form-control" placeholder="name@example.com" />
              <label>Answer 1</label>
            </div>
            <div className="btn-group">
              <span>
                <AiOutlinePlus className="icon-add" />
                <AiOutlineMinus className="icon-remove" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
