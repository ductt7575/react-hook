import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const Questions = (props) => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: 'question 1',
      image: '',
      imageName: '',
      answers: [{ id: uuidv4(), description: 'Answer 1', isCorrect: false }],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      const newQuestion = {
        id: uuidv4(),
        description: '',
        image: '',
        imageName: '',
        answers: [{ id: uuidv4(), description: 'Answer 1', isCorrect: false }],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === 'REMOVE') {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };

  const handleAddRemoveAnswer = (type, qId, aId) => {
    let questionsClone = _.cloneDeep(questions);
    if (type === 'ADD') {
      const newAnswer = { id: uuidv4(), description: '', isCorrect: false };
      let index = questionsClone.findIndex((item) => item.id === qId);
      questionsClone[index].answers.push(newAnswer);
      setQuestions(questionsClone);
    }
    if (type === 'REMOVE') {
      let index = questionsClone.findIndex((item) => item.id === qId);
      questionsClone[index].answers = questionsClone[index].answers.filter((item) => item.id !== aId);
      setQuestions(questionsClone);
    }
  };

  return (
    <div className="questions-container">
      <div className="title">Question Management</div>
      <hr />
      <div className="add-new-question">
        <div className="col-6 form-group">
          <label className="mb-3 d-block fst-italic">Select quiz</label>
          <Select onChange={setSelectedQuiz} options={options} />
        </div>
        <p className="my-3 fst-italic">Add questions</p>
        {questions.length &&
          questions &&
          questions.map((question, index) => {
            return (
              <div key={question.id} className="q-main mb-4">
                <div className="question-content">
                  <div className="form-floating description">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name@example.com"
                      value={question.description}
                    />
                    <label>Question {index + 1}'s description</label>
                  </div>
                  <div className="group-upload">
                    <label>
                      <RiImageAddFill className="label-up" />
                    </label>
                    <input type="file" hidden />
                    <span>0 file is uploaded</span>
                  </div>
                  <div className="btn-add">
                    <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                      <AiOutlinePlus className="icon-add" />
                    </span>
                    {questions.length > 1 && (
                      <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                        <AiOutlineMinus className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {question.answers &&
                  question.answers.length &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <div className="col-1 d-flex justify-content-center">
                          <input className="form-check-input is-correct" type="checkbox" />
                        </div>
                        <div className="form-floating answer-name col-5">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            value={answer.description}
                          />
                          <label>Answer {index + 1}</label>
                        </div>
                        <div className="btn-group">
                          <span onClick={() => handleAddRemoveAnswer('ADD', question.id, '')}>
                            <AiOutlinePlus className="icon-add" />
                          </span>
                          {question.answers.length > 1 && (
                            <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                              <AiOutlineMinus className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
