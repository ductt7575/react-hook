import { useState } from 'react';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';

const TableQuiz = (props) => {
  const { listQuiz, fetchQuiz, options } = props;
  const [showHideUpdateQuiz, setShowHideUpdateQuiz] = useState(false);
  const [showHideDeleteQuiz, setShowHideDeleteQuiz] = useState(false);

  const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});
  const [dataDeleteQuiz, setDataDeleteQuiz] = useState({});

  const handleClickBtnUpdate = (quiz) => {
    setShowHideUpdateQuiz(true);
    setDataUpdateQuiz(quiz);
  };

  const resetUpdateDataQuiz = () => {
    setDataUpdateQuiz({});
  };

  const handleClickBtnDelete = (quiz) => {
    setShowHideDeleteQuiz(true);
    setDataDeleteQuiz(quiz);
  };

  return (
    <>
      <table className="table table-hover table-bordered mt-2 mb-0">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Difficulty</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.map((quiz, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <td>{quiz.id}</td>
                  <td>{quiz.name}</td>
                  <td>{quiz.description}</td>
                  <td>{quiz.difficulty === 'undefined' ? 'Not selected' : quiz.difficulty}</td>
                  <td>
                    <button className="btn btn-warning me-3" onClick={() => handleClickBtnUpdate(quiz)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleClickBtnDelete(quiz)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalUpdateQuiz
        show={showHideUpdateQuiz}
        setShow={setShowHideUpdateQuiz}
        dataUpdateQuiz={dataUpdateQuiz}
        fetchQuiz={fetchQuiz}
        options={options}
        resetUpdateDataQuiz={resetUpdateDataQuiz}
      />

      <ModalDeleteQuiz
        show={showHideDeleteQuiz}
        setShow={setShowHideDeleteQuiz}
        dataDeleteQuiz={dataDeleteQuiz}
        fetchQuiz={fetchQuiz}
      />
    </>
  );
};

export default TableQuiz;
