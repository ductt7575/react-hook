import { useState } from 'react';
import './ManageQuiz.scss';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { FcPlus } from 'react-icons/fc';

const options = [
  { value: 'EASY', label: 'EASY' },
  { value: 'MEDIUM', label: 'MEDIUM' },
  { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitQuiz = async (event) => {
    //validate
    if (!name || !description) {
      toast.error('Name/Description is required');
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    console.log(res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName('');
      setDescription('');
      setType('');
      setImage(null);
    }
    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <div className="quiz-container">
      <div className="title">Manage Quiz</div>
      <hr />
      <div className="add-new">
        <fieldset className="border rounded-3 p-3 mt-4">
          <legend className="float-none w-auto px-3">Add new quiz</legend>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label>
              Name <span className="text-danger">(*)</span>
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label>
              Description <span className="text-danger">(*)</span>
            </label>
          </div>
          <div className="mb-3">
            <Select defaultValue={type} onChange={setType} options={options} placeholder={'choose difficulty'} />
          </div>
          <div className="col-md-12  mb-3">
            <label className="form-label label-upload " htmlFor="label-upload">
              <FcPlus /> Upload File Image
            </label>
            <input type="file" id="label-upload" hidden onChange={(event) => handleChangeFile(event)} />
          </div>
          <div className="col-md-12 img-preview">
            {previewImage ? <img src={previewImage} /> : <span>Preview Image</span>}
          </div>
          <div>
            <button className="btn btn-warning mt-4" onClick={(event) => handleSubmitQuiz(event)}>
              Save
            </button>
          </div>
        </fieldset>
      </div>
      <div className="list-detail">table</div>
    </div>
  );
};

export default ManageQuiz;
