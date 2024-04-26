import { useState } from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import { postSignup } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import Languages from '../Header/Languages';

const Signup = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPass, setShowPass] = useState(false);
  const clickHandler = () => {
    setShowPass((prev) => !prev);
  };

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };
  const validatePassword = (password) => {
    return (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      password.length > 5
    );
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    // validate
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    if (!isValidEmail) {
      toast.error('Invalid email');
      return;
    }
    if (!isValidPassword) {
      toast.error('Invalid password');
      return;
    }
    // Submit apis
    let data = await postSignup(email, username, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate('/login');
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="signup-container">
      <div className="header text d-flex align-items-center justify-content-end mx-5 px-5 gap-2 mt-4">
        <Link to="/" className="m-0 me-auto text-primary text-decoration-none">
          {`<`} Back home
        </Link>
        <p className="m-0">Already have an account?</p>
        <Link to={'/login'} className="btn border-dark me-3">
          Log in
        </Link>
        <Languages />
      </div>
      <div className="signup-body col-4 mx-auto mt-4 pt-3">
        <p className="text-center fs-5 mb-0">Welcome to...</p>
        <div className="text-center mb-4 mt-3">
          <Link to="/" className="text-decoration-none fs-2 fw-bold text-dark">
            Trong Duc's Application
          </Link>
        </div>
        <div className="content-form">
          <form onSubmit={(event) => handleSignup(event)}>
            <div className="form-group mt-3">
              <label className="fw-bolder">
                Email <span className="fw-normal text-danger">(*)</span>
              </label>
              <input
                value={email}
                type="email"
                className="form-control mt-2"
                placeholder="abc@gmail.com"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label className="fw-bolder">
                Username <span className="fw-normal text-danger">(Optional)</span>
              </label>
              <input
                value={username}
                type="text"
                className="form-control mt-2"
                placeholder="abc123"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label className="fw-bolder">
                Password <span className="fw-normal text-danger">(*)</span>
              </label>
              <div className="input-group position-relative">
                <input
                  value={password}
                  type={showPass ? 'text' : 'password'}
                  className="form-control mt-2 rounded z-2"
                  placeholder="At least 6 letters"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <span
                  style={{ cursor: 'pointer' }}
                  className="user-select-none position-absolute top-50 end-0 translate-middle z-3"
                  onClick={() => clickHandler()}
                >
                  {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>
            <div className="form-group mt-4">
              <button
                className="btn btn-dark col-12 mt-3"
                // onClick={() => handleSignup()}
              >
                Create a free account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
