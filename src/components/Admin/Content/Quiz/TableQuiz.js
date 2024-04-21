import { useState, useEffect } from 'react';
import { getAllQuizForAdmin } from '../../../../services/apiService';

const TableQuiz = (props) => {
  const [listQuiz, setListQuiz] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    console.log('>>> res: ', res);
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
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
                  <td>{quiz.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      //  onClick={() => props.handleClickBtnView(user)}
                    >
                      Detail
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      // onClick={() => props.handleClickBtnUpdate(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      // onClick={() => props.handleClickBtnDelete(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
