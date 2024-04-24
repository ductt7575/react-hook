import { useState } from 'react';
import Select from 'react-select';
import './Questions.scss';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _, { valuesIn } from 'lodash';

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
      description: '',
      imageFile: '',
      imageName: '',
      answers: [{ id: uuidv4(), description: '', isCorrect: false }],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      const newQuestion = {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [{ id: uuidv4(), description: '', isCorrect: false }],
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
      if (index > -1) {
        questionsClone[index].answers = questionsClone[index].answers.filter((item) => item.id !== aId);
        setQuestions(questionsClone);
      }
    }
  };

  const handleOnchange = (type, qId, value, aId) => {
    if (type === 'QUESTION') {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === qId);
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };

  const handleOnchangeFileQuestion = (qId, event) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === qId);
    if (index > -1 && event.target && event.target.files && event.target.files[0]) {
      questionsClone[index].imageFile = event.target.files[0];
      // questionsClone[index].imageName = event.target.files[0].name;
      var split = event.target.files[0].name.split('.');
      var filename = split[0];
      var extension = split[1];
      if (filename.length > 15) {
        filename = filename.substring(0, 15);
      }
      questionsClone[index].imageName = filename + '.' + extension;
      setQuestions(questionsClone);
    }
  };

  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map((answer) => {
        if (answer.id === answerId) {
          if (type === 'CHECKBOX') {
            answer.isCorrect = value;
          }

          if (type === 'INPUT') {
            answer.description = value;
          }
        }
        return answer;
      });
      setQuestions(questionsClone);
    }
  };

  const handleSubmitQuestionForQuiz = () => {
    console.log('questions:', questions);
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
        {questions.length > 0 &&
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
                      onChange={(event) => handleOnchange('QUESTION', question.id, event.target.value, '')}
                    />
                    <label>Question {index + 1}'s description</label>
                  </div>
                  <div className="group-upload">
                    <label htmlFor={question.id}>
                      <RiImageAddFill className="label-up" />
                    </label>
                    <input
                      id={question.id}
                      type="file"
                      hidden
                      onChange={(event) => handleOnchangeFileQuestion(question.id, event)}
                    />
                    {question.imageFile ? <span>{question.imageName}</span> : <span>0 file is uploaded</span>}
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
                  question.answers.length > 0 &&
                  question.answers.map((answer, index) => {
                    return (
                      <div key={answer.id} className="answers-content">
                        <div className="col-1 d-flex justify-content-center">
                          <input
                            className="form-check-input is-correct"
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={(event) =>
                              handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)
                            }
                          />
                        </div>
                        <div className="form-floating answer-name col-5">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            value={answer.description}
                            onChange={(event) =>
                              handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)
                            }
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

        {questions.length > 0 && questions && (
          <div>
            <button onClick={() => handleSubmitQuestionForQuiz()} className="btn btn-warning">
              Save question
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
